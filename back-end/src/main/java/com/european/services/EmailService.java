package com.european.services;

public interface EmailService {

    void sendMessage(String to, String subject, String text);
}
