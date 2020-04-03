const express = require('express')
const bodyParser = require('body-parser')
const { createEventAdapter } = require('@slack/events-api')
const { createMessageAdapter } = require('@slack/interactive-messages')
const { WebClient } = require('@slack/web-api')

const jsonblocks = require('./slack-blocks/jsonblocks.js');

const port =  3000
const app = express()
const token = 'xoxb-211016332822-1028687213491-zSTfl1M5PIzbKZNqhng0DP0E'
const webClient = new WebClient(token)

const slackEvents = createEventAdapter('ad0461c8b32352d5c6bcdcfbcd627094')
const slackInteractions = createMessageAdapter('ad0461c8b32352d5c6bcdcfbcd627094')

app.use('/slack/events', slackEvents.expressMiddleware())
app.use('/slack/actions', slackInteractions.expressMiddleware())

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

slackEvents.on('message', async (event) => {
    
    if(event.text == 'leave')
    {
      const mentionResponseBlock = { ...jsonblocks.messageJsonBlock, ...{channel: event.channel}}
      const res = await webClient.chat.postMessage(mentionResponseBlock)
    }
  
})


slackInteractions.action({ actionId: 'open_modal_button' }, async (payload) => {
  try {
    await webClient.views.open({
        trigger_id: payload.trigger_id,
        view: jsonblocks.modalJsonBlock
      }
    )
  } catch (e) {
    console.log(JSON.stringify(e))
  }

  return {
    text: 'Processing...',
  }
})

var nameInput = '';

slackInteractions.viewSubmission('request_modal_submit' , async (payload) => {
  const blockData = payload.view.state

  console.log("this is the payload");
  const resultjson = payload.user;
  console.log(resultjson.name);

  nameInput = resultjson.name;

  console.log(blockData.values);
  console.log(nameInput);


   channelid = "G0117LJMTMW";

    

  var msg = nameInput + " is asking leave from " + firstdate + " to "+ lastdate;

  const res =  webClient.chat.postMessage({ channel: channelid, text: msg });

  
  const acceptResponseBlock = { ...jsonblocks.acceptJsonBlock, ...{channel: channelid}}
  const ress = webClient.chat.postMessage(acceptResponseBlock)
  

  return {
    response_action: "clear"
  }
})

// Starts server
app.listen(port, function() {
  console.log('Bot is listening on port ' + port)
})

var firstdate = '';
var lastdate = '';


slackInteractions.action({ actionId: 'sib' }, async (payload) => {
 
  const payloadjson = payload.actions;
  firstdate = payloadjson[0].selected_date
  console.log('first date: ', firstdate);
  

  return {
    text: 'Processing...',
  }
})


slackInteractions.action({ actionId: 'eib' }, async (payload) => {
 
  const payloadjson = payload.actions;
  lastdate = payloadjson[0].selected_date
  console.log('late date: ', lastdate);
  

  return {
    text: 'Processing...',
  }
})

 const { google } = require('googleapis')

 const { OAuth2 } = google.auth


 function creatingGoogleCalendarEvent(){
  
  console.log(firstdate);
  console.log(lastdate);
  console.log('Export Functionsssss');
  const oAuth2Client = new OAuth2(
      '425368922902-3qq8uo4jp0ij1to2dfmbl581pejobefk.apps.googleusercontent.com',
      'kYDg_A1risqxvT3SFq9jS-Hh'
    )

    console.log("Hi.....");
    
    // Call the setCredentials method on our oAuth2Client instance and set our refresh token.
    oAuth2Client.setCredentials({
      refresh_token: '1//04QL8OAkvzVC2CgYIARAAGAQSNwF-L9IrP8OMki4CmXylEq6UwOOAdp9Iv6nh5JukXbLL0eGR5amvcnZwWyzwpVWIFMlyi-v2MKs',
    })
    
    // Create a new calender instance.
    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })
    
    const event = {
      summary: 'OOO',
      description: 'created by'+nameInput,
      colorId: 1,
      start: {
        dateTime:  firstdate+"T03:30:00-06:00",
        timeZone: 'America/Denver',
      },
      end: {
        dateTime:  lastdate+"T03:30:00-06:00",
        timeZone: 'America/Denver',
      },
    };
    
    calendar.events.insert(
      { calendarId: 'cawstudios.com_h9n57n47kd6olq8sad3p04045k@group.calendar.google.com', resource: event },
      err => {
        // Check for errors and log them if they exist.
        if (err) return console.error('Error Creating Calender Event:', err)
        // Else log that the event was created.
        return console.log('New Calendar event successfully created.')
      }
    );
    
}



slackInteractions.action({ actionId: 'btn1' }, async (payload) => {
 
 creatingGoogleCalendarEvent();

 console.log("Accept Button Click");
  try {
    await webClient.views.open({
        trigger_id: payload.trigger_id,
        view: jsonblocks.popupJsonBlock
      }
    )
  } catch (e) {
    console.log("Accept Button Error");
  }

channelid = "D011820KD70";

var msg = nameInput + " leave request from " + firstdate + " to "+ lastdate + " Accepted";

const res =  webClient.chat.postMessage({ channel: channelid, text: msg });


  

  return {
    text: 'Processing...',
  }
})

slackInteractions.action({ actionId: 'btn2' }, async (payload) => {
 
  //creatingGoogleCalendarEvent();
  console.log('Calendar Event is not created');

  console.log("Reject Button Click");
  try {
    await webClient.views.open({
        trigger_id: payload.trigger_id,
        view: jsonblocks.popupclearJsonBlock
      }
    )
  } catch (e) {
    console.log("Accept Button Error");
  }
  
  channelid = "D011820KD70";

  var msg = nameInput + " leave request from " + firstdate + " to "+ lastdate + " Rejected";
  
  const res =  webClient.chat.postMessage({ channel: channelid, text: msg });
  

  //const res =  webClient.chat.postMessage({ channel: channelid, text: "Rejected Your Leave Request" });
 
   return {
     text: 'Processing...',
   }
 })




slackInteractions.viewSubmission('popupclear' , async (payload) => {

  console.log('pop up');
 
   return {
     response_action: "clear"
   }
 })
 

slackInteractions.viewSubmission('popup' , async (payload) => {

 console.log('pop up');

  return {
    response_action: "clear"
  }
})

slackInteractions.viewSubmission('popupclear' , async (payload) => {

  console.log('pop up');
 
   return {
     response_action: "clear"
   }
 })







