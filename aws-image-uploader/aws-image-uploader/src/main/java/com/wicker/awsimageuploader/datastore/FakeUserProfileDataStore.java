package com.wicker.awsimageuploader.datastore;

import com.wicker.awsimageuploader.profile.UserProfile;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public class FakeUserProfileDataStore {

    private static final List<UserProfile> USER_PROFILES = new ArrayList<>();

    static {

        USER_PROFILES.add(new UserProfile(UUID.fromString("28a5b5f4-69a1-48da-bfec-65c8642ced4f"),"JohnWick", null));
        USER_PROFILES.add(new UserProfile(UUID.fromString("7bbed07b-1a24-4d52-954b-34de74ffc973"),"Neo", null));
    }

    public List<UserProfile> getUserProfiles() {
        return USER_PROFILES;
    }
}
