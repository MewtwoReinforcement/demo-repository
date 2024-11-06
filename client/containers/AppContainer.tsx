import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FeedContainer from './FeedContainer';

import { Contact, Feed, Flag, FlaggedMessage, Header, Message } from '../types';

const AppContainer: React.FC = () => {
  const [userID] = useState('');
  const [selectedFeed, setSelectedFeed] = useState<Feed>('contacts');
  const [flaggedMessages, setFlaggedMessages] = useState<FlaggedMessage[]>([]);
  const [contacts, setContacts] = useState<Set<Contact>>(new Set());

  console.log("AppContainer Render");

  useEffect(() => {
    fetch(`/users/${userID}/messages`)
      .then((response) => response.json())
      // maybe we concat recent messages?
      .then((newMessages: Message[]) =>
        setFlaggedMessages(() =>
          newMessages.map((message) => {
            // should probably move this part out to a utils function
            // (and the contacts state can be fetched directly from that one)
            const from: Contact =
              message.payload.headers.find(
                ({ name }: Header) => name === 'from',
              )?.value ?? 'No From Header Found';
            const flags = new Set<Flag>();
            if (contacts.has(from)) flags.add('contacts');
            // could identify what makes an email a package tracking email here
            // add package flag

            return { ...message, flags };
          }),
        ),
      )
      .catch((error) => {
        // TODO: need to check actual message
        if (error.message === 'connection error') {
          // change something on dom display?
          console.log('Error connecting with backend');
        }
      });

    fetch(`/users/${userID}/contacts`)
      .then((response) => response.json())
      .then((newContacts) => setContacts(() => newContacts))
      .catch((error) => {
        // TODO: need to check actual message
        if (error.message === 'connection error') {
          // change something on dom display?
          console.log('Error connecting with backend');
        }
      });
  }, []);

  // const filteredMessages: FlaggedMessage[] = flaggedMessages.filter(
  //   ({ flags }: FlaggedMessage): boolean =>
  //     selectedFeed === 'other' ? flags.size === 0 : flags.has(selectedFeed),
  // );

  const filteredMessages = [{
    tags: new Set(['contacts']),
    id: '1',
    threadId: 'thread123',
    labelIds: ['label123'],
    snippet: 'Snippet of Message',
    historyId: 'history123',
    internalDate: '11/06/2024',
    payload: {
      partId: '1',
      mimeType: 'unknown',
      filename: 'email.txt',
      headers: [{ name: 'from', value: 'joeBiden@whitehouse.gov' },  {name: 'Subject', value: "Important update from the whitehouse"}],
      body: {
        attachmentId: '70',
        size: 10,
        data: "Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...",
      },
      parts: [],
    },
    sizeEstimate: 10,
    raw: 'etc',
  },
  {
    tags: new Set(['contacts']),
    id: '2',
    threadId: 'thread123',
    labelIds: ['label123'],
    snippet: 'Snippet of Message',
    historyId: 'history123',
    internalDate: '11/05/2024',
    payload: {
      partId: '1',
      mimeType: 'unknown',
      filename: 'email.txt',
      headers: [{ name: 'from', value: 'joeBiden@whitehouse.gov' },  {name: 'Subject', value: "Important update from the whitehouse"}],
      body: {
        attachmentId: '70',
        size: 10,
        data: "Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...",
      },
      parts: [],
    },
    sizeEstimate: 10,
    raw: 'etc',
  },{
    tags: new Set(),
    id: '5',
    threadId: 'thread1ljlskd23',
    labelIds: ['labsdfasdel123'],
    snippet: 'SPAAAM',
    historyId: 'history1saf23',
    internalDate: '12/01/1997',
    payload: {
      partId: '1',
      mimeType: 'unknown',
      filename: 'email.txt',
      headers: [{ name: 'from', value: 'someguy@whitehouse.gov' }, {name: 'Subject', value: "you should take a look at this"}],
      body: {
        attachmentId: '70',
        size: 10,
        data: "Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...Hey, It's your pal Joe. Please Vote today...",
      },
      parts: [],
    },
    sizeEstimate: 10,
    raw: 'etc',
  }

];


  return (
    <>
      <Navbar selectedFeed={selectedFeed} setSelectedFeed={setSelectedFeed} />
      <FeedContainer messages={filteredMessages} />
    </>
  );
};

export default AppContainer;
