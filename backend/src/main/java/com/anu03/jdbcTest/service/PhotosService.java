package com.anu03.jdbcTest.service;

import com.anu03.jdbcTest.model.Photo;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

@Service
public class PhotosService {

    private Map<Integer, Photo> db = new HashMap<>() {{
        put(1, new Photo(1, "hello.jpg"));
    }};

    public Collection<Photo> get() {
        return db.values();
    }

    public Photo get(int id) {
        return db.get(id);
    }

    public Photo remove(int id) {
        return db.remove(id);
    }

    public Photo save(String fileName, String contentType, byte[] data) {
        Photo photo = new Photo();
        photo.setContentType(contentType);
        photo.setFileName(fileName);
        photo.setData(data);
        db.put(photo.getId(), photo);
        return photo;
    }
}
