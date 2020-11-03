```xml
<App>
    <!-- <AppPreferencesContextProvider> -->
    <AppStack>
        <NavigationContainer>
            <AuthContextProvider>
                <TabNavigation>
                    <!-- <TabContextProvider> -->
                    <HomePage />
                    <OpenOrdersPage />
                    <MyOrdersPage />
                    <!-- </TabContextProvider> -->
                </TabNavigation>
                <SignInNavigation>
                    <LoginPage />
                </SignInNavigation>
            <AuthContextProvider>
        </NavigationContainer>
    </AppStack>
    <!-- <AppPreferencesContextProvider> -->
</App>
```