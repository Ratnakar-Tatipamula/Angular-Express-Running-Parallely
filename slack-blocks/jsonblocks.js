module.exports = {
    
    messageJsonBlock : {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Ask Leave"
            },
            "accessory": {
              "type": "button",
              "action_id": "open_modal_button", // We need to add this  
              "text": {
                "type": "plain_text",
                "text": "Ask Leave",
                "emoji": true
              },
              "value": "launch_button_click"
            }
          }
        ]
      },



      modalJsonBlock : {
        "type": "modal",
        "callback_id": "request_modal_submit", // We need to add this  
        "title": {
          "type": "plain_text",
          "text": "Chimpoo",
          "emoji": true
        },
        "submit": {
          "type": "plain_text",
          "text": "Done",
          "emoji": true
        },
        "close": {
          "type": "plain_text",
          "text": "Cancel",
          "emoji": true
        },
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Asking For Leave"
            }
          },
          {
            "type": "section",
            "block_id": "section12345",
            "text": {
              "type": "mrkdwn",
              "text": "start date"
            },
            "accessory": {
              "type": "datepicker",
              "action_id": "sib",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a date"
              }
            }
          },
          {
            "type": "section",
            "block_id": "section1234",
            "text": {
              "type": "mrkdwn",
              "text": "end date"
            },
            "accessory": {
              "type": "datepicker",
              "action_id": "eib",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a date"
              }
            }
          }
              
        ]
      },




       acceptJsonBlock : {
        "blocks": [
          {
            "type": "section",
            "block_id": "btn_submit1",
            "text": {
              "type": "mrkdwn",
              "text": " "
            },
            "accessory": {
              "type": "button",
              "style": "primary",
              "action_id": "btn1",
              "text": {
                "type": "plain_text",
                "text": "Accept",
                "emoji": true
              },
              "value": "click_me_123"
            }
          },
          {
            "type": "section",
            "block_id": "btn_submit2",
            "text": {
              "type": "mrkdwn",
              "text": " "
            },
            "accessory": {
              "type": "button",
              "style": "danger",
              "action_id": "btn2",
              "text": {
                "type": "plain_text",
                "text": "Reject",
                "emoji": true
              },
              "value": "click_me_1234"
            }
          }
        ]
      },



      
    popupclearJsonBlock : {
    "type": "modal",
    "callback_id": "popupclear", // We need to add this  
    "title": {
      "type": "plain_text",
      "text": "Rejected",
      "emoji": true
    },
    
    "close": {
      "type": "plain_text",
      "text": "OK",
      "emoji": true
    },
    "blocks": [
    
          
    ]
  },

   popupJsonBlock : {
    "type": "modal",
    "callback_id": "popup", // We need to add this  
    "title": {
      "type": "plain_text",
      "text": "Accepted",
      "emoji": true
    },
    "close": {
      "type": "plain_text",
      "text": "OK",
      "emoji": true
    },
    "blocks": [
    
          
    ]
  }
  
      
      
      
    
    
    
    
      
}



 


