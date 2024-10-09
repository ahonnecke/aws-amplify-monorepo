import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import TodoList from './components/TodoList';

Amplify.configure(awsExports);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div>
          <h1>Hello {user.username}</h1>
          <button onClick={signOut}>Sign out</button>
          <TodoList />
        </div>
      )}
    </Authenticator>
  );
}

export default App;