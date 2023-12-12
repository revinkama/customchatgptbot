package com.chatgptcomm.ChatGPTComm.controllers;

import com.chatgptcomm.ChatGPTComm.dtos.ChatGPTRequests;
import com.chatgptcomm.ChatGPTComm.dtos.ChatGPTResponses;
import com.chatgptcomm.ChatGPTComm.dtos.Choice;
import com.chatgptcomm.ChatGPTComm.dtos.Message;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/bot")
@CrossOrigin("http://localhost:3000")
@AllArgsConstructor
@NoArgsConstructor
public class ChatGPTBotController {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String url;

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("/chat")
    public List<Choice> chatGPTResponses(@RequestParam(required = true) String content) {
        ChatGPTRequests requests = new ChatGPTRequests(model, content);
        ChatGPTResponses responses = restTemplate.postForObject(url, requests, ChatGPTResponses.class);
        return responses.getChoices();
    }

}
