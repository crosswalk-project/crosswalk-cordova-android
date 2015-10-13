How to build optimized xwalk_core_library
=======================

1) Follow below link to setup environment and checkout crosswalk source code

   [Building Crosswalk](https://crosswalk-project.org/contribute/building_crosswalk.html)

2) Checkout to crosswalk-lite-10 branch
```
cd /path/to/src/xwalk
git checkout -b crosswalk-lite-10 origin/crosswalk-lite-10
```
Next, edit your .gclient file (generated above) and change the url entry. It should look like this:
```
"url": "git://github.com/crosswalk-project/crosswalk.git@origin/crosswalk-lite-10",
```
After that, sync your code again:
```
gclient sync

```

3) Edit config file to enable cocos2d optimization

In ```xwalk/gyp_xwalk```

Change ```args.append('-Denable_cocos2d=0')``` to ```args.append('-Denable_cocos2d=1')```

4) Build crosswalk

5) Replace xwalk_core_library under framework with the one you currently built.
