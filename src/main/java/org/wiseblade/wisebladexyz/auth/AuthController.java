package org.wiseblade.wisebladexyz.auth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.header.Header;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService service;
    @PostMapping ("/registration")
    public ResponseEntity<AuthenticationResponse> register(@ModelAttribute RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@ModelAttribute AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }
}
