---
layout: post
title: Creating a Cross-Engine Debug Wrapper for Reusable Game Code
description: 
date: 2024-05-01 15:01:35 +0300
image: '/images/general/godot-debug.jpg'
tags: [Programming]
tags_color: '#de47e2'
featured: false
---

Porting a project from Unity to Godot as a solo developer introduced a need I hadn't encountered before:  
How do I **retain the same project architecture and utility layer**, while respecting the **different debug output conventions** of each engine?

Rather than littering the codebase with `#if UNITY` or `#if GODOT` directives or duplicating systems, I created a **simple debug abstraction** to keep my game code engine-agnostic.

---

## The Goal

As part of my effort to **reuse as much code as possible** across engines, I wanted to:
- Preserve the same **GameDebug.Log()**, `GameDebug.Warning()`, and `GameDebug.Error()` calls from the Unity project.
- Swap out the underlying implementation depending on the engine.
- Keep engine-specific code **decoupled from game systems and shared utilities**.

---

## The Solution

I created a **debug routing layer** using a simple interface-based approach:

1. A pure C# static class `GameDebug` used by all systems.
2. An interface `IDebugWrapper` representing the debug message handler.
3. An engine-specific implementation (`GodotDebug` in this case) hooked into Godot’s `GD.Print()`, `GD.PushWarning()`, etc.

---

### `IDebugWrapper` Interface

```csharp
public interface IDebugWrapper  
{  
    string Name { get; }  
    void Log(string message);  
    void LogWarning(string message);  
    void LogError(string message);  
}
```

This interface defines the core debug methods used by `GameDebug`, allowing any backend to plug in.

---

### `GameDebug` Static Class

```csharp
public static partial class GameDebug  
{  
    private static List<IDebugWrapper> debugWrappers = new List<IDebugWrapper>();  
    
    public static void Log(string message)  
    {       
        foreach (var wrapper in debugWrappers)  
            wrapper.Log(message);  
    }    
    
    public static void LogWarning(string message)  
    {       
        foreach (var wrapper in debugWrappers)  
          wrapper.LogWarning(message);  
    }    
    
    public static void LogError(string message)  
    {       
        foreach (var wrapper in debugWrappers)  
          wrapper.LogError(message);  
    }  
   
    public static void RegisterDebugWrapper(IDebugWrapper wrapper)  
    {       
        if (!debugWrappers.Contains(wrapper))  
        {          
            debugWrappers.Add(wrapper);  
            Log($"Registered: {wrapper.Name}.");  
        }       
        else  
        {  
            LogError($"{wrapper.Name} already registered.");  
        }
    }
}
```

This class serves as the **entry point for all debug messages** in the game code. It's engine-agnostic and delegates to the underlying implementation.

---

### `GodotDebug` Implementation

```csharp
using Godot; 
  
public partial class GodotDebug : Node, IDebugWrapper  
{  
    // Called when the node enters the scene tree for the first time.  
    public override void _Ready()  
    {       
        GameDebug.RegisterDebugWrapper(this);  
    }  
    
    public new string Name => "Godot Debug";  
  
    public void Log(string message)  
    {       
        GD.Print(message);  
    }  
    public void LogWarning(string message)  
    {      
        GD.PushWarning($"WARNING: {message}");  
    }  
    public void LogError(string message)  
    {      
        GD.PushError($"ERROR: {message}");  
    }
}
```

In Godot, this class binds `GameDebug` to Godot’s `GD.Print()`, `GD.PrintErr()`, etc., ensuring native behavior for debugging and logging.

---

## Why This Matters

This wrapper gives me:
- **Consistent code** between Unity and Godot projects.
- **Engine independence** in my core systems and utilities.
- **Simple, swappable logging behavior** that can be extended or suppressed (e.g., during tests).

It’s a small but powerful architectural pattern that supports **clean layering, long-term reuse, and ease of porting** all of which are essential when working solo or across multiple engines.
