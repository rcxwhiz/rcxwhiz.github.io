---
tags: ["Java", "Minecraft", "JVM"]
title: Modded Minecraft JVM Optimization
date: 2024-02-07
excerpt: I explored and empirically determined the best modded Minecraft JVM settings through hours of sound testing. The results are simpler than you would think.
---

Any modded Minecraft enthusiast knows the struggle of getting the game to run well. When you stick together hundreds of comminty written mods into Minecraft (a somewhat poorly optimized game to begin with), you end up with a RAM hungry beast that is difficult to feed and control. There has been a long history of specificly tunned JVM arguments, RAM allocations, and obscure JREs to get the most out of your Minecraft and modded Minecraft performance. 

I'll go ahead and spoil the conclusion a little bit: none of this really matters anymore. Modern mainstream JVMs are very capable for the workload of modded Minecraft, without any special adjustments or tweaking. Don't believe me? I didn't believe it either, so I decided to do hours of standardized benchmarks to figure out once and for all what the deal is.

## Choosing a JVM

There are plenty of JVMs out there, but I focused on two families for testing: Eclipse's Adoptium Temurin, and Oracle's GraalVM. Adoptium is essentially the defacto *standard* JVM these days. If you don't know what you're doing, this is the JVM you want. 

GraalVM has an interesting history. The idea behind GraalVM was to make Java more practical in serverless applications like AWS Lambda, where the long time to start a JVM is a performance killer and racks up bills. It was also supposed to need less RAM. The GraalVM runtime supposedly included more aggresive optimizations than any other JVM before, but beyond that, the headline feature was *native image* - the ability to compile your Java program into a native executable. No more JVM. I don't think this feature was ever meant to give revolutionary performance in your application, but the startup time was supposed to be eliminated. Native image is irrelevant to modded Minecraft players because it is impracticle (maybe impossible) to compile all the different mods together. For modded Minecraft players, the relevant feature is the "aggressive optimizations".

GraalVM used to be split into community edition and enterprise edition. I assume the original idea was to charge money for the enterprise edition, but by the time I was interested in it it was free. The idea was that there were "optimizations" that only existed in the enterprise edition, so you would want to use that one. These days the community/enterprise editions have been depreciated, and there is one "Oracle GraalVM" which contains all the optimizations etc. If you are going to use GraalVM these days, this is the version you should use.

In review, I tested two JVMs: the more "vanilla" Adoptium, and the lean mean virtual machine GraalVM. There are also a few tests with GraalVM Enterprise Edition, but it was not better than Oracle GraalVM.

## JVM version

There are different JVM versions. For a while they have been on an annual release cycle, so only some of the major versions actually matter. The main Java versions that matter for Minecraft are 8, 17 and 21. Older versions of Minecraft (<1.18) officially support Java 8. Newer versions of Minecraft (>=1.18) support Java 17. 

Java version updates improve the efficiency of the JVM, but they also just add language features and so on. Java 18 is not necessarily "faster" than Java 17, and when there are optimizations to the newest Java version, they are backported as well as possible.

Java 17 is a massive improvement over Java 8, so if you are playing a version of Minecraft that officially supports Java 8, I would highly recommend doing what you have to do to get it to run with 17. Java 21 has some improvements over Java 17, but it is not technically supported for the Minecraft version I'm testing (1.19.2).

For my testing I tried Java 17 and 21.

## JVM arguments & garbage collectors

If you are somewhat familiar with Java, you might have heard of "garbage collection". When programming in Java, you don't have to manually deal with lifetime of the objects and structures you make (which take up RAM). You create them, and they magically go away when they're no longer needed. The magically going away is garbage collection, and there are many different strategies and algorithms for doing it efficiently. The more RAM that needs to magically go away, the more expensive and time consuming garbage collection is. This will be felt in periodic freezes of your Java program (the garbage collector taking so long it has to momentarily freeze the program). Modded Minecraft uses **A LOT** of RAM, so garbage collection can be a struggle.

If Adoptium is the "vanilla" JVM, G1GC is the "vanilla" garbage collector. Other notable collectors are Shenandoah and ZGC. You can specify your garbage collector in the extra arguments you provide the JVM. If you don't specify a garbage collector or arguments, the JVM just uses its default with the default settings (usually G1GC). Something else to keep in mind is that not every JVM supports every garbage collector. 

I tested the following arguments:

<div class="overflow-x-scroll text-nowrap">

G1GC: `-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:ThreadPriorityPolicy=1 -XX:AllocatePrefetchStyle=3 -XX:+UseG1GC -XX:MaxGCPauseMillis=37 -XX:+PerfDisableSharedMem -XX:G1HeapRegionSize=16M -XX:G1NewSizePercent=23 -XX:G1ReservePercent=20 -XX:SurvivorRatio=32 -XX:G1MixedGCCountTarget=3 -XX:G1HeapWastePercent=20 -XX:InitiatingHeapOccupancyPercent=10 -XX:G1RSetUpdatingPauseTimePercent=0 -XX:MaxTenuringThreshold=1 -XX:G1SATBBufferEnqueueingThresholdPercent=30 -XX:G1ConcMarkStepDurationMillis=5.0 -XX:G1ConcRSHotCardLimit=16 -XX:G1ConcRefinementServiceIntervalMillis=150 -XX:GCTimeRatio=99`

</div><div class="overflow-x-scroll text-nowrap">

GraalVM specific G1GC: `-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:AllocatePrefetchStyle=3 -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:+EagerJVMCI -Dgraal.TuneInlinerExploration=1 -Dgraal.CompilerConfiguration=enterprise -XX:+UseG1GC -XX:MaxGCPauseMillis=37 -XX:+PerfDisableSharedMem -XX:G1HeapRegionSize=16M -XX:G1NewSizePercent=23 -XX:G1ReservePercent=20 -XX:SurvivorRatio=32 -XX:G1MixedGCCountTarget=3 -XX:G1HeapWastePercent=20 -XX:InitiatingHeapOccupancyPercent=10 -XX:G1RSetUpdatingPauseTimePercent=0 -XX:MaxTenuringThreshold=1 -XX:G1SATBBufferEnqueueingThresholdPercent=30 -XX:G1ConcMarkStepDurationMillis=5.0 -XX:G1ConcRSHotCardLimit=16 -XX:G1ConcRefinementServiceIntervalMillis=150 -XX:GCTimeRatio=99`

</div><div class="overflow-x-scroll text-nowrap">

Shenandoah: `-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:ThreadPriorityPolicy=1 -XX:AllocatePrefetchStyle=3 -XX:+UseShenandoahGC -XX:ShenandoahGCMode=iu -XX:ShenandoahGuaranteedGCInterval=1000000 -XX:AllocatePrefetchStyle=1`

</div><div class="overflow-x-scroll text-nowrap">

ZGC: `-XX:+UnlockExperimentalVMOptions -XX:+UseZGC -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:+PerfDisableSharedMem -XX:-ZUncommit -XX:+ParallelRefProcEnabled`

</div><div class="overflow-x-scroll text-nowrap">

Bruce ZGC: `-XX:+UnlockExperimentalVMOptions -XX:+UnlockDiagnosticVMOptions -XX:+AlwaysActAsServerClassMachine -XX:+AlwaysPreTouch -XX:+DisableExplicitGC -XX:+UseNUMA -XX:NmethodSweepActivity=1 -XX:ReservedCodeCacheSize=400M -XX:NonNMethodCodeHeapSize=12M -XX:ProfiledCodeHeapSize=194M -XX:NonProfiledCodeHeapSize=194M -XX:-DontCompileHugeMethods -XX:MaxNodeLimit=240000 -XX:NodeLimitFudgeFactor=8000 -XX:+UseVectorCmov -XX:+PerfDisableSharedMem -XX:+UseFastUnorderedTimeStamps -XX:+UseCriticalJavaThreadPriority -XX:ThreadPriorityPolicy=1 -XX:AllocatePrefetchStyle=3 -XX:+UseZGC -XX:AllocatePrefetchStyle=1 -XX:-ZProactive`

</div>

As well as no arguments.

## RAM allocations

In most Minecraft launchers, you specify the amount of RAM Minecraft will be able to use while it runs. If you allocate too little, you will run into garbage collector stuttering as it struggles to keep the RAM use low enough. The traditional wisdom has been that if you allocate *too much*, you will get infrequent longer garbage collection pauses as it lets too much RAM use build up and then struggles to clear it out periodically. 

The traditional wisdom has also been that it is best practice to set your minimum and maximum RAM use to the same value so that your game does not spend extra effort trying to reduce your RAM use lower than you care about. 

I tested the too little, too much, and same min/max allocation factors.

## Testing

I did all my testing with the All The Mods 8 (ATM8) modpack. It's on Minecraft 1.19.2, and has hundreds of mods. I had to update forge to be able to use Java 21. I created a test world with controlled conditions to benchmark in. As you can see above, there are a lot of different factors test. I tried my best to be methodical and rule out as many factors as possible, while still thouroughly testing the conditions and not making any assumptions about the performance impact any factor will have. You can see a summary of the results below (or the full results [here](https://docs.google.com/spreadsheets/d/1AcuoRrdjbBAZH1bFMhMHovCDvlV-sgnRlx3a2ByIrC8/edit#gid=0)). High FPS is good, low tick duration is good.

#### 8 GB allocated tests

I think that 8GB RAM allocation is a reasonable amount for this pack.

<div class="table-responsive">

| Version | JVM | Args | Launch Time | World Load Time | Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Median Tick (ms) | 95th % Tick (ms) | Max Tick (ms) | RAM Use (GB) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 17 | Adoptium | None | 1:26 | 1:14 | 226.3 | 14.0 | 107.7 | 130.2 | 2.8 | 3.5 | 21.1 | 7.3 |
| 21 | Adoptium | None | 1:24 | 1:13 | 203.0 | 5.8 | 94.8 | 117.6 | 3.2 | 3.9 | 27.8 | 7.6 |
| 17 | Oracle GraalVM | None | 1:21 | 1:18 | 167.9 | 10.2 | 79.1 | 98.7 | 3.5 | 4.5 | 30.1 | 7.2 |
| 21 | Oracle GraalVM | None | 1:24 | 1:15 | 174.1 | 5.9 | 82.0 | 104.4 | 3.0 | 3.8 | 21.3 | 7.6 |
| 17 | Adoptium | G1GC | 1:25 | 1:13 | 209.9 | 10.5 | 89.2 | 114.1 | 3.2 | 4.2 | 21.4 | 6.4 |
| 21 | Adoptium | G1GC | 1:22 | 1:11 | 208.2 | 4.1 | 97.3 | 119.5 | 3.1 | 3.8 | 23.6 | 7.3 |
| 17 | Oracle GraalVM | G1GC | 1:19 | 1:13 | 198.0 | 4.6 | 95.7 | 117.4 | 3.1 | 3.8 | 5.6 | 6.2 |
| 21 | Oracle GraalVM | G1GC | 1:20 | 1:14 | 184.0 | 4.6 | 89.7 | 110.4 | 3.2 | 4.1 | 48.3 | 7.3 |
| 17 | GraalVM EE | None | 1:23 | 1:16 | 181.1 | 3.5 | 84.9 | 103.7 | 3.5 | 4.4 | 44.3 | 7.2 |
| 17 | GraalVM EE | G1GC | 1:20 | 1:13 | 183.2 | 9.9 | 87.6 | 107.4 | 3.3 | 4.0 | 30.4 | 6.2 |
| 17 | Oracle GraalVM | Graal G1GC | 1:21 | 1:16 | 162.6 | 6.8 | 65.4 | 91.9 | 3.4 | 5.4 | 23.7 | 6.3 |
| 21 | Oracle GraalVM | Graal G1GC | 1:21 | 1:14 | 173.8 | 4.9 | 81.9 | 104.0 | 3.3 | 4.2 | 47.2 | 7.3 |
| 17 | GraalVM EE | Graal G1GC | 1:22 | 1:16 | 167.0 | 9.3 | 72.2 | 96.3 | 3.4 | 4.9 | 46.1 | 6.3 |
| 17 | Adoptium | ZGC | 1:41 | 1:32 | 177.7 | 8.4 | 79.1 | 101.8 | 3.6 | 4.8 | 31.6 | 8.0 |
| 17 | Oracle GraalVM | ZGC | 1:33 | 1:32 | 144.7 | 3.3 | 63.2 | 78.3 | 4.2 | 5.9 | 25.3 | 8.0 |
| 21 | Oracle GraalVM | ZGC | 1:29 | 1:32 | 150.3 | 2.8 | 62.2 | 86.0 | 3.6 | 5.7 | 26.2 | 8.0 |
| 21 | Adoptium | Bruce ZGC | 1:40 | 1:31 | 181.1 | 1.7 | 78.5 | 99.4 | 3.6 | 5.0 | 25.6 | 8.0 |
| 17 | Adoptium | Shenandoah | 1:32 | 1:31 | 166.8 | 6.2 | 68.0 | 90.6 | 3.6 | 5.3 | 25.9 | 6.7 |
| 21 | Adoptium | Sehnandoah | 1:35 | 1:27 | 164.4 | 4.7 | 71.5 | 92.1 | 3.8 | 5.1 | 28.6 | 6.7 |

</div>

As you can see, Adoptium 17 with no args is unmatched in this case.

#### 6 GB allocated tests

6 GB RAM allocation is a little low for this pack, so these tests would highlight configurations that are well suited to low RAM. Theoretically this would benefit GraalVM.

<div class="table-responsive">

| Version | JVM | Args | Launch Time | World Load Time | Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Median Tick (ms) | 95th % Tick (ms) | Max Tick (ms) | RAM Use (GB) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 17 | Adoptium | None | 1:26 | 1:15 | 195.6 | 9.1 | 90.1 | 111.2 | 3.3 | 4.3 | 26.1 | 5.4 |
| 17 | Adoptium | G1GC | 1:24 | 1:15 | 195.0 | 10.2 | 89.5 | 112.3 | 3.3 | 4.1 | 22.8 | 5.5 |
| 21 | Adoptium | G1GC | 1:22 | 1:11 | 195.4 | 3.9 | 87.4 | 112.6 | 3.3 | 4.3 | 60.8 | 5.5 |
| 17 | Oracle GraalVM | G1GC | 1:18 | 1:14 | 155.0 | 13.3 | 71.2 | 91.9 | 3.5 | 4.6 | 41.3 | 5.6 |
| 17 | GraalVM EE | G1GC | 1:20 | 1:14 | 166.5 | 4.3 | 80.4 | 98.0 | 3.3 | 4.3 | 26.5 | 5.6 |
| 17 | Oracle GraalVM | Graal G1GC | 1:22 | 1:19 | 180.4 | 13.7 | 85.7 | 105.8 | 3.3 | 4.3 | 55.9 | 5.6 |
| 17 | GraalVM EE | Graal G1GC | 1:21 | 1:15 | 164.3 | 10.3 | 75.7 | 95.4 | 3.6 | 4.6 | 28.5 | 5.6 |

</div>

As you can see, Adoptium 17 with no args is essentially superior again in a memory constrained scenario.

#### 10 GB allocated tests

10 GB is on the higher end to allocate to this pack, so these tests would highlight configurations that benefit from excess RAM. Supposedly this should favor ZGC.

<div class="table-responsive">

| Version | JVM | Args | Launch Time | World Load Time | Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Median Tick (ms) | 95th % Tick (ms) | Max Tick (ms) | RAM Use (GB) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 17 | Adoptium | None | 1:24 | 1:14 | 211.9 | 13.7 | 95.0 | 117.2 | 3.3 | 4.0 | 37.9 | 8.9 |
| 17 | Adoptium | G1GC | 1:26 | 1:13 | 202.6 | 12.5 | 91.2 | 113.8 | 3.2 | 4.2 | 22.4 | 8.0 |
| 21 | Adoptium | G1GC | 1:22 | 1:10 | 203.8 | 5.6 | 89.1 | 115.8 | 3.3 | 4.3 | 27.5 | 9.1 |
| 17 | Adoptium | ZGC | 1:33 | 1:22 | 179.0 | 6.6 | 76.5 | 97.3 | 3.8 | 5.4 | 27.4 | 10.0 |
| 21 | Adoptium | ZGC | 1:35 | 1:21 | 187.6 | 8.3 | 82.5 | 106.0 | 3.5 | 4.8 | 32.6 | 10.0 |
| 17 | Oracle GraalVM | ZGC | 1:29 | 1:23 | 144.2 | 3.5 | 65.3 | 81.1 | 4.2 | 5.9 | 24.2 | 10.0 |
| 21 | Oracle GraalVM | ZGC | 1:28 | 1:22 | 154.6 | 4.6 | 66.2 | 90.0 | 3.7 | 5.2 | 30.4 | 10.0 |

</div>

As you can see again, Adoptium 17 with no args is superior in this scenario.

##### A note on generational ZGC:

One of the recent advancements of Java 21 is generational ZGC, which is an enhancement to the ZGC garbage collector. It's supposed to make it more suitable for FPS sensitive tasks like Minecraft. I tried it, ran some tests with it (results [here](https://docs.google.com/spreadsheets/d/18YSNCFHyPzN8kcJ1c5aZNVEnls3r0G3lh7GrIbN5VrI/edit#gid=0)), and basically it doesn't beat Adoptium 17 no args. It's alright, but I don't think it's worth testing any further.

## Factors averaged

The following tables show the statistically significant difference when switching from A to B. High FPS and low tick times are good.

##### Java 17 -> Java 21

<div class="table-responsive">

| Min FPS | Max Tick |
| --- | --- |
| -26% | +102% |

</div>

##### Adoptium -> GraalVM

<div class="table-responsive">

| Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Max Tick |
| --- | --- | --- | --- | --- |
| -16% | -24% | -15% | -13% | +12% |

</div>

##### No args -> G1GC

<div class="table-responsive">

| Min FPS |
| --- |
| -21% |

</div>

##### No args -> Shenandoah

<div class="table-responsive">

| Launch Time | World Load Time | Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Median Tick | 95th % Tick | Max Tick | RAM Use |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| +21% | +15% | -23% | -37% | -31% | -26% | +24% | +41% | +13% | -10% |

</div>

##### No args -> ZGC

<div class="table-responsive">

| Launch Time | World Load Time | Avg FPS | Min FPS | 99th % FPS | 95th % FPS | Median Tick | 95th % Tick |
| --- | --- | --- | --- | --- | --- | --- | --- |
| +13% | +19% | -14% | -32% | -20% | -17% | +17% | +35% |

</div>

## Conclusion

For this Minecraft 1.19.2 modpack, you can't beat Adoptium 17 with no args. It should be nice that the optimal solution is so simple, but it ruins the feeling that you can squeeze a little more performance out of Minecraft with some JVM tuning.

One JVM setting that **will** make or break your Minecraft experience is switching from Java 8 to 17. If you are on an older version of Minecraft that is supposed to use Java 8, try to see if there is a way to upgrade to 17. Usually that will give a pretty massive bump in performance. In this testing we haven't seen a jump like that from 17 to 21.

I haven't even mentioned performance mods in this post. If you are looking for something that will make or break your modded Minecraft experience, there are some really good performance mods out there that can do that for you. For forge 1.19.2 there is embeddium, which dramatically improves rendering performance. Starlight overhauls the lighting engine really well. Modernfix has a lot of critical patches and improvements, including a newer setting available in config called **dynamic resources**. Dynamic resources has made a massive difference for me and some of my friends. [This repo](https://github.com/TheUsefulLists/UsefulMods/tree/main) has lots of useful information on performance mods. 

Thanks for reading to the end!
