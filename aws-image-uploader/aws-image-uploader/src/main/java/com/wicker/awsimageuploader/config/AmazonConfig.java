package com.wicker.awsimageuploader.config;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonConfig {

    @Bean
    public AmazonS3 s3(){

        String accessKey,secretKey,REGION;
        REGION="ap-south-1";

        AWSCredentials awsCredentials = new BasicAWSCredentials(
                accessKey = "",
                secretKey = ""
        );

        return AmazonS3ClientBuilder
                .standard().withRegion(REGION)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }
}
