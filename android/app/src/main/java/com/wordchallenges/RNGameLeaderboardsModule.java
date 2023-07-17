package com.wordchallenges;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import android.util.Log;
import android.content.Intent;
import androidx.annotation.NonNull;

import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;

import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.GamesSignInClient;
import com.google.android.gms.games.LeaderboardsClient;

public class RNGameLeaderboardsModule extends ReactContextBaseJavaModule {

  private static final int RC_LEADERBOARD_UI = 9002;
  private static final String TAG = "RNGameLeaderboards";

  public RNGameLeaderboardsModule (ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return "RNGameLeaderboardsModule";
  }

  @ReactMethod
  public void signIn(final Promise promise) {
    Log.d(TAG, "Attempting GooglePlayServices manual sign in");

    GamesSignInClient gamesSignInClient = PlayGames.getGamesSignInClient(getCurrentActivity());

    gamesSignInClient.signIn().addOnCompleteListener(isAuthenticatedTask -> {
      boolean isAuthenticated = (
          isAuthenticatedTask.isSuccessful() &&
          isAuthenticatedTask.getResult().isAuthenticated()
      );

      if (isAuthenticated) {
        Log.d(TAG, "Sign in successful");

        if (promise != null) {
          promise.resolve("Sign in successful");
        }
      } else {
        Log.d(TAG, "Sign in failed", isAuthenticatedTask.getException());

        if (promise != null) {
          promise.reject("Sign in failed");
        }
      }
    });
  }

  @ReactMethod
  public void setLeaderboardScore(String id, int score, final Promise promise) {
    LeaderboardsClient leaderboardsClient = getLeaderboardsClient();

    if(leaderboardsClient == null) {
      promise.reject("Not signed in to Google Play Services");

      return;
    }

    leaderboardsClient.submitScore(id, score);

    promise.resolve("Leaderboard score set");
  }

  @ReactMethod
  public void showAllLeaderboards(final Promise promise) {
    LeaderboardsClient leaderboardsClient = getLeaderboardsClient();

    if(leaderboardsClient == null) {
      promise.reject("Not signed in to Google Play Services");

      return;
    }

    leaderboardsClient.getAllLeaderboardsIntent()
        .addOnSuccessListener(new OnSuccessListener<Intent>() {
            @Override
            public void onSuccess(Intent intent) {
                Log.d(TAG, "getAllLeaderboardsIntent onSuccess");
                getCurrentActivity().startActivityForResult(intent, RC_LEADERBOARD_UI);

                promise.resolve("Leaderboards successfully launched");
            }
        })
        .addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                promise.reject("Error launching leaderboards");
            }
        });
  }

  @ReactMethod
  public void showLeaderboard(String id, final Promise promise) {
    LeaderboardsClient leaderboardsClient = getLeaderboardsClient();

    if(leaderboardsClient == null) {
      promise.reject("Not signed in to Google Play Services");

      return;
    }

    leaderboardsClient.getLeaderboardIntent(id)
        .addOnSuccessListener(new OnSuccessListener<Intent>() {
            @Override
            public void onSuccess(Intent intent) {
                getCurrentActivity().startActivityForResult(intent, RC_LEADERBOARD_UI);

                promise.resolve("Leaderboard successfully launched");
            }
        })
        .addOnFailureListener(new OnFailureListener() {
            @Override
            public void onFailure(@NonNull Exception e) {
                promise.reject("Error launching leaderboards");
            }
        });
  }

  private LeaderboardsClient getLeaderboardsClient() {
    return PlayGames.getLeaderboardsClient(getCurrentActivity());
  }
}