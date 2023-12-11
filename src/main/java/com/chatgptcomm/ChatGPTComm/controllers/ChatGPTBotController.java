package com.chatgptcomm.ChatGPTComm.controllers;

import com.chatgptcomm.ChatGPTComm.dtos.ChatGPTRequests;
import com.chatgptcomm.ChatGPTComm.dtos.ChatGPTResponses;
import com.chatgptcomm.ChatGPTComm.dtos.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/bot")
public class ChatGPTBotController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/chat")
    public String chatGPTResponses(@RequestParam String content) {
        ChatGPTRequests requests = new ChatGPTRequests(model, content);
        ChatGPTResponses responses = restTemplate.postForObject(url, requests, ChatGPTResponses.class);
        return responses.getChoices().get(0).getMessage().getContent();
    }

}
