package com.anu03.jdbcTest.web;

import com.anu03.jdbcTest.service.PhotosService;
import com.anu03.jdbcTest.model.Photo;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.Collection;


//this annotation will tell spring to automatically create a new instance when running main
@RestController
public class PhotosController {

    private final PhotosService photosService;

    public PhotosController(PhotosService photosService) {
        this.photosService = photosService;
    }

    //    if we goto 'http://localhost:8080/' this should be run
    @GetMapping("/")
    public String hello() {
//        here we can return HTML elements as a String
        return "<h1>Welcome to the project</h1><p>This is a Spring Boot app!</p>";
    }

    // this is the "select * from" method
    @GetMapping("/photos")
    public Iterable<Photo> get() {
        return photosService.get();
    }

//    // this is the "select 1 from" method
//    @GetMapping("/photos/{id}")
//    public Photo get(@PathVariable Integer id) {
//        Photo photo = photosService.get(id);
//        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
//        return photo;
//    }

    // this will be the new get method to actually display the images
    @GetMapping("/photos/{id}")
    public Photo get(@PathVariable Integer id) {
        Photo photo = photosService.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    // this is the "delete from " method
    //test it with
    // await fetch("http://localhost:8080/photos/1", { method: "DELETE" });
    @DeleteMapping("/photos/{id}")
    public void delete(@PathVariable Integer id) {
        photosService.remove(id);
    }

    // this is the "insert into" method
    /*
    test this with:
    (async function createPhoto() {
          let photo = {"fileName": "hello.jpg"};

          await fetch("http://localhost:8080/photos", {
                    method: "POST",
                    headers: {
                              "Accept": "application/json",
                              "Content-Type": "application/json"
                    },
                    body: JSON.stringify(photo)
                    })
                    .then(result => result.text())
                    .then(text => alert(text));
            })();
    */
    @PostMapping("/photos")
    public Photo create(@RequestPart("data")MultipartFile file) throws IOException {
       return photosService.save(file.getOriginalFilename(), file.getContentType(), file.getBytes());
    }

}