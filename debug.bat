@echo off
cd exampleSite
hugo server --gc --themesDir=../.. --port=41135 -w -D --disableFastRender --cleanDestinationDir --tlsAuto
pause
