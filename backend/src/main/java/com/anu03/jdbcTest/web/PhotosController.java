package com.anu03.jdbcTest.web;

import com.anu03.jdbcTest.model.Photo;
import com.anu03.jdbcTest.service.PhotosService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;


//this annotation will tell spring to automatically create a new instance when running main
@RestController
public class PhotosController {
    //    if we goto 'http://localhost:8080/' this should be run

    private PhotosService photosService;

    public PhotosController(PhotosService photosService) {
        this.photosService = photosService;
    }


    @GetMapping("/")
    public String hello() {
//        here we can return HTML elements as a String
        return "<h1>Welcome to the project</h1><p>This is a Spring Boot app!</p>";
    }

    @GetMapping ("/photos")
    public Collection<Photo> get() {
        return photosService.get();
    }

    @GetMapping ("/photos/{id}")
    public Photo get(@PathVariable String id) {
        Photo photo = photosService.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    @DeleteMapping("/photos/{id}")
    public void delete(@PathVariable String id) {
        Photo photo = photosService.remove(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/photos")
    public Photo create(@RequestPart("data") MultipartFile file) throws IOException {
        return photosService.save(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }

}