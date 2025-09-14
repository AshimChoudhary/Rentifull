'use client';

import React, { ReactNode, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import {
  Authenticator,
  Heading,
  Radio,
  RadioGroupField,
  useAuthenticator,
  View,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useRouter, usePathname } from 'next/navigation';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
    },
  },
});

// Custom Components for Amplify Authenticator
const components = {
  Header() {
    return (
      <View className="mt-4 mb-7">
        <Heading level={3} className="text-2xl font-bold">
          RENT
          <span className="text-rose-300 font-light hover:text-rose-200">
            IFUL
          </span>
        </Heading>
        <p className="text-muted-foreground mt-2">
          <span className="font-bold">Welcome!</span> Please sign in to continue
        </p>
      </View>
    );
  },
  SignIn: {
    Footer() {
      const { toSignUp } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">Don&apos;t have an Account? </p>
          <button
            onClick={toSignUp}
            className="text-rose-300 hover:underline bg-transparent border-none p-0"
          >
            Sign up Here!
          </button>
        </View>
      );
    },
  },
  SignUp: {
    FormFields() {
      const { validationErrors } = useAuthenticator();
      return (
        <>
          <Authenticator.SignUp.FormFields />
          <RadioGroupField
            legend="Role"
            name="custom:role"
            errorMessage={validationErrors?.['custom:role']}
            hasError={!!validationErrors?.['custom:role']}
            isRequired
          >
            <Radio value="tenant">Tenant</Radio>
            <Radio value="manager">Manager</Radio>
          </RadioGroupField>
        </>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View className="text-center mt-4">
          <p className="text-muted-foreground">Already have an Account? </p>
          <button
            onClick={toSignIn}
            className="text-rose-300 hover:underline bg-transparent border-none p-0"
          >
            Sign In!
          </button>
        </View>
      );
    },
  },
};

// Form field overrides
const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter your Email',
      label: 'Email',
      isRequired: true,
    },
    password: {
      placeholder: 'Enter your Password',
      label: 'Password',
      isRequired: true,
    },
  },
  signUp: {
    username: {
      order: 1,
      placeholder: 'Choose a username',
      label: 'Username',
      isRequired: true,
    },
    email: {
      order: 2,
      placeholder: 'Enter your email address',
      label: 'Email',
      isRequired: true,
    },
    password: {
      order: 3,
      placeholder: 'Create a password',
      label: 'Password',
      isRequired: true,
    },
    confirm_password: {
      order: 4,
      placeholder: 'Confirm your password',
      label: 'Confirm Password',
      isRequired: true,
    },
  },
};

const Auth = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthenticator((context) => [context.user]);
  const router = useRouter();
  const pathName = usePathname();

  const isAuthPage = /^\/(signIn|signUp)$/i.test(pathName);
  const isDashboardPage =
    pathName.startsWith('/manager') || pathName.startsWith('/tenants');

  // Redirect logged-in users away from signIn/signUp
  useEffect(() => {
    if (user && isAuthPage) {
      router.push('/');
    }
  }, [user, isAuthPage, router]);

  // Protect dashboard pages
  useEffect(() => {
    if (!user && isDashboardPage) {
      router.push('/signIn');
    }
  }, [user, isDashboardPage, router]);

  // If not an auth page, just render children
  if (!isAuthPage && !isDashboardPage) {
    return <>{children}</>;
  }

  return (
    <div className="h-full">
      <Authenticator
        initialState={
          pathName.toLowerCase().includes('signup') ? 'signUp' : 'signIn'
        }
        components={components}
        formFields={formFields}
      >
        {({ user }) => <>{children}</>}
      </Authenticator>
    </div>
  );
};

export default Auth;
