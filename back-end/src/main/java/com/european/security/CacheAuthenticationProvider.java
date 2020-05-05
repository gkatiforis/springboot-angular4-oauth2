package com.european.security;

import com.european.config.CacheConfig;
import com.european.exception.UnauthorizedException;
import com.european.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component("sd")
public class CacheAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private CacheConfig cache;

    @Override
    public Authentication authenticate(Authentication authentication)
            throws AuthenticationException {

        String password = authentication.getCredentials().toString();

     if (cache.getUserCache().containsKey(password)) {
            User user = cache.getUserCache().get(password);
            return new UsernamePasswordAuthenticationToken(user
                    , null, new ArrayList<>());
        } else {
           throw new UnauthorizedException("Password is incorrect");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(
                UsernamePasswordAuthenticationToken.class);
    }
}