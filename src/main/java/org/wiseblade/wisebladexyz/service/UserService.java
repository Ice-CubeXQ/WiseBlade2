package org.wiseblade.wisebladexyz.service;

import org.wiseblade.wisebladexyz.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void saveUser(User user);
    Optional<User> findByEmail(String email);
    List<User> findAllUsers();
}
