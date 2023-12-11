package com.chatgptcomm.ChatGPTComm.dtos;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ChatGPTRequests {
    private String model;
    private List<Message> messages;

    public ChatGPTRequests(String model, String content) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user", content));
    }
}
