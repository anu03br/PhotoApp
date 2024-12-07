package com.anu03.jdbcTest;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collection;
import java.util.HashMap; // TODO anschauen was HashMap ist
import java.util.Map;
import java.util.UUID;


//this annotation will tell spring to automatically create a new instance when running main
@RestController
public class PhotosController {
    //    if we goto 'http://localhost:8080/' this should be run

    private Map<String, Photo> db = new HashMap<>() {{
        put("1", new Photo("1", "hello.jpg"));
    }};


    @GetMapping("/")
    public String hello() {
//        here we can return HTML elements as a String
        return "<h1>Welcome to the project</h1><p>This is a Spring Boot app!</p>";
    }

    // this is the "select * from" method
    @GetMapping("/photos")
    public Collection<Photo> get() {
        return db.values();
    }

    // this is the "select 1 from" method
    @GetMapping("/photos/{id}")
    public Photo get(@PathVariable String id) {
        Photo photo = db.get(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        return photo;
    }

    // this is the "delete from " method
    //test it with
    // await fetch("http://localhost:8080/photoz/1", { method: "DELETE" });
    @DeleteMapping("/photos/{id}")
    public void delete(@PathVariable String id) {
        Photo photo = db.remove(id);
        if (photo == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND);
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
    public Photo create(@RequestBody @Valid Photo photo) {
        photo.setId(UUID.randomUUID().toString());
        db.put(photo.getId(), photo);
        return photo;
    }

}