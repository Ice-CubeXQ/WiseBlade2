package org.wiseblade.wisebladexyz.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.wiseblade.wisebladexyz.model.User;
import org.wiseblade.wisebladexyz.repository.UserRepository;
import org.wiseblade.wisebladexyz.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
//@Primary
public class UserServiceImpl implements UserService {

    private final UserRepository repository;
    @Override
    public void saveUser(User user) {
        repository.save(user);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return repository.findByEmail(email);
    }

    @Override
    public List<User> findAllUsers() {
        return repository.findAll();
    }
}
