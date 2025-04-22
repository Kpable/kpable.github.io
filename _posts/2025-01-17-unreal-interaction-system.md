---
layout: post
title: Building an Interactable System in Unreal Engine
description: 
date: 2025-01-17 15:01:35 +0300
image: '/images/11.jpg'
tags: [Programming]
tags_color: '#de47e2'
featured: false
---

In many first-person or third-person games, a core feature is the ability to **look at and interact with objects in the world** whether it's opening a door, picking up an item, or talking to an NPC.

For this project, I implemented a modular **Interactable System** in Unreal Engine using trace channels, interfaces, and clean input handling. The system supports reusable and scalable interactions across different gameplay scenarios.

## Core Concept

The interactable system separates responsibilities between two types of actors:

- **Interactor**: An entity capable of detecting and interacting with other objects (e.g. the player).
- **Interactable**: Any actor in the world that can be interacted with (e.g. a button, lever, or item).

## Detection: Looking at Things in the World

To detect potential interactables, I created a **custom trace channel** and a trace-based detection method.

### New Trace Channel: `Interactable`

1. In the Unreal Project Settings, I defined a **new Trace Channel** named `Interactable`.
2. All interactable actors are set to **Block** on this trace channel.

### Player Detection: Sphere Trace

The player performs a **Sphere Trace** each frame or on a tick to detect objects within interaction range.

```cpp
void UInteractorComponent::UpdateTrace()
{
    FHitResult HitResult;
    if (FireSphereTraceFromCamera(HitResult))
    {
        DrawDebugSphere(GetWorld(), HitResult.ImpactPoint, SphereRadius, 10, FColor::Red);

        AActor* HitActor = HitResult.GetActor();

        if (HitActor == nullptr)
        {
            UE_LOG(LogTemp, Warning, TEXT("Hit Actor is null."))
            return;
        }

        if (!HitActor->Implements<UInteractableInterface>())
        {
            UE_LOG(LogTemp, Warning, TEXT("Hit Actor does not implement UInteractableInterface."))
            return;
        }
        
        if (HitActor != CurrentInteractableActor || HitResult.Distance > IInteractableInterface::Execute_GetInteractRange(HitActor))
        {
            ClearCurrentInteractable();
        }		

        if (HitActor != CurrentInteractableActor && HitResult.Distance <= IInteractableInterface::Execute_GetInteractRange(HitActor))
        {
            CurrentInteractableActor = HitActor;
            CurrentInteractable = TScriptInterface<IInteractableInterface>(CurrentInteractableActor);
            CurrentInteractable->Execute_EnterFocus(CurrentInteractableActor);
        }
    }
}
```

This trace allows a bit of forgiveness for imperfect aim and enables support for interactables at slight angles from the player's center.

## Marking Actors as Interactable

To allow actors to respond to player input, they must implement an **interface** and provide behavior for when they are interacted with.

### `InteractableInterface`

This interface defines the contract any interactable actor must follow.

```cpp
UINTERFACE(MinimalAPI, Blueprintable)
class UInteractableInterface : public UInterface
{
    GENERATED_BODY()
};

class IInteractableInterface
{
    GENERATED_BODY()
public:
    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "Interactable")
    void Interact();

    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "Interactable")
    void EnterFocus();

    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "Interactable")
    void ExitFocus();

    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "Interactable")
    bool IsFocused();

    UFUNCTION(BlueprintCallable, BlueprintNativeEvent, Category = "Interactable")
    float GetInteractRange();
};
```

<!-- ### Example: Interactable Actor

Here's how an actor can implement the interface:

```cpp
// TODO: Add AActor subclass implementing InteractableInterface
```

You can now define unique behavior per interactable whether it’s opening a container or triggering a cinematic. -->

## Player Interaction

When the player presses the interaction key:

1. The system checks if the player is currently targeting a valid `InteractableInterface`.
2. If so, it calls the interface’s `Interact_Implementation()` method.

```cpp
UCLASS()
class AInteractable : public AActor, public IInteractableInterface
{
    GENERATED_BODY()
    
public:	

    AInteractable();

    // The range the player must be to allow interaction
    UPROPERTY(BlueprintReadWrite)
    float InteractRange = 200.f;

protected:
    virtual void BeginPlay() override;

    bool IsCurrentlyFocused = false;

    void SetCollisionEnabled(bool bEnabled);

public:	
    virtual void Tick(float DeltaTime) override;

    /*
    * InteractableInterface
    */
    
    virtual void Interact_Implementation() override;
    virtual float GetInteractRange_Implementation() override;
    virtual void EnterFocus_Implementation() override;
    virtual void ExitFocus_Implementation() override;
    virtual bool IsFocused_Implementation() override;

    /*
    * End InteractableInterface
    */

protected:
    UPROPERTY(EditAnywhere, BlueprintReadOnly, Category = "Components", meta = (AllowPrivateAccess = "true"))
    UStaticMeshComponent* BaseMesh;
    
};
```

This approach decouples the input logic from the actor behavior, making the system flexible and extendable.

## Example Usage

Imagine walking up to a glowing terminal. The player looks at it, presses the interaction key, and:

- A sound plays
- A UI panel opens
- The terminal changes color

All of this behavior is contained within the terminal's `Interact_Implementation()` method, cleanly separated from the player logic.

## Summary

This interactable system includes:

- A **dedicated trace channel** for performance and clarity.
- A **sphere trace** for forgiving and flexible targeting.
- A clean **interface-based architecture** for interaction logic.
- Input handling that keeps player code simple and scalable.

It enables rich, immersive world interaction with minimal coupling ideal for large-scale or sandbox-style gameplay systems.
