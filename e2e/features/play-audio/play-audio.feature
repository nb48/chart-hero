Feature: Play Audio

    Scenario: User attempts to play without selecting audio file
        When I open the app
        Then I should see a disabled play button
        And I should see a disabled stop button
        And I should see a disabled current time input

    Scenario: User selects an audio file
        When I open the app
        And I select an audio file
        Then I should see an enabled play button
        And I should see an enabled stop button
        And I should see an enabled current time input with value '0' m '0' s

    Scenario: User plays the audio
        When I open the app
        And I select an audio file
        And I click on the play button
        Then the audio should be playing

    Scenario: User pauses the audio
        When I open the app
        And I select an audio file
        And I click on the play button
        And I wait for '2' seconds
        And I click on the pause button
        Then the audio should not be playing
        And I should see an enabled current time input with value '0' m '2' s

    Scenario: User pauses the audio and then plays again
        When I open the app
        And I select an audio file
        And I click on the play button
        And I wait for '2' seconds
        And I click on the pause button
        And I click on the play button
        Then the audio should be playing
        And I wait for '2' seconds
        And I click on the pause button
        Then the audio should not be playing
        And I should see an enabled current time input with value '0' m '4' s

    Scenario: User stops the audio while playing
        When I open the app
        And I select an audio file
        And I click on the play button
        And I wait for '2' seconds
        And I click on the stop button
        Then the audio should not be playing
        And I should see an enabled current time input with value '0' m '0' s

    Scenario: User stops the audio while paused
        When I open the app
        And I select an audio file
        And I click on the play button
        And I wait for '2' seconds
        And I click on the pause button
        And I click on the stop button
        Then the audio should not be playing
        And I should see an enabled current time input with value '0' m '0' s

    Scenario: User lets the audio finish
        When I open the app
        And I select an audio file
        And I click on the play button
        And I wait for '6' seconds
        Then the audio should not be playing
        And I should see an enabled current time input with value '0' m '0' s

    Scenario: User skips to the end of the song
        When I open the app
        And I select an audio file
        And I type '0m4s' into the current time input
        And I click on the play button
        Then the audio should be playing
        When I wait for '2' seconds
        Then the audio should not be playing
