import React from 'react';
import conf from '../conf/config.js';

import { Client, Account, ID,Databases,Storage,Query } from "appwrite";


export class Service{
    client =new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (err) {
            console.error("Error creating post:", err);
        }
    }
    
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (err) {
            console.error("Error updating post:", err);
        }
    }
    
    async deletePost(slug){
        try{
             await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug);
             return true;

        }catch(err){
            console.log(err);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)

        }catch(err){
            console.log(err);
            return false;
        }

    }
    async getPosts(queries=[Query.equal("status","active")]){
            try{
                return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,queries,
                )

            }catch(err){
                console.log(err);
                return false;
            }
    }
    // file upload service
    async uploadFile(file) {
        try {
            console.log("Uploading file:", file);
            const response = await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
            console.log("File uploaded successfully:", response);
            return response; // Make sure response contains $id
        } catch (err) {
            console.error("File upload failed:", err);
            return null; // Ensure function returns null on failure
        }
    }
    
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
            return true;

        }catch(err){
            console.log(err);
            return false;
        }

    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }

}

const service = new Service();

export default service;












