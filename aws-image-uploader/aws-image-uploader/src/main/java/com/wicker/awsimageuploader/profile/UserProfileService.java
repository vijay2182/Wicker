package com.wicker.awsimageuploader.profile;

import com.wicker.awsimageuploader.buckets.BucketName;
import com.wicker.awsimageuploader.filestore.FileStore;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class UserProfileService {

    private final UserProfileDataAccessService userProfileDataAccessService;
    private final FileStore fileStore;

    @Autowired
    public UserProfileService(UserProfileDataAccessService userProfileDataAccessService, FileStore fileStore) {
        this.userProfileDataAccessService = userProfileDataAccessService;
        this.fileStore = fileStore;
    }

    public List<UserProfile> getUserProfiles(){

        return userProfileDataAccessService.getUserProfiles();
    }

    public void uploadUserProfileImage(UUID userProfileId, MultipartFile file) {
        //check empty file
        isFileEmpty(file);
        //check file is an image
        isImage(file);
        //User exists?
        UserProfile user = getUser(userProfileId);

        //Grab if any metadata
        Map<String, String> metadata = getMetadata(file);

        //store image in s3 and update the DB(userProfileImageLink) with s3 image link
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), userProfileId);
        String fileName = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path,fileName, Optional.of(metadata), file.getInputStream());
            user.setUserProfileImageLink(fileName);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }

    public byte[] downloadUserProfileImage(UUID userProfileId) {
        UserProfile user = getUser(userProfileId);
        String path = String.format("%s/%s", BucketName.PROFILE_IMAGE.getBucketName(), userProfileId);
        return user.getUserProfileImageLink().map(key -> fileStore.download(path, key)).orElse(new byte[0]);
    }

    private Map<String, String> getMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private UserProfile getUser(UUID userProfileId) {
        return userProfileDataAccessService.getUserProfiles()
                .stream()
                .filter(userProfile -> userProfile.getUserProfileId().equals(userProfileId)).findFirst()
                .orElseThrow(() -> new IllegalStateException("No user found"));
    }

    private void isImage(MultipartFile file) {
        if(!Arrays.asList(ContentType.IMAGE_GIF.getMimeType(), ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_JPEG.getMimeType()).contains(file.getContentType()))
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
    }

    private static void isFileEmpty(MultipartFile file) {
        if(file.isEmpty())
            throw new IllegalStateException("Cannot upload empty file [ "+ file.getSize()+ "]");
    }


}
