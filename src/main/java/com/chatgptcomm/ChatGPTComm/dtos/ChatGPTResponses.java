package com.chatgptcomm.ChatGPTComm.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatGPTResponses {

    private List<Choice> choices;

}
