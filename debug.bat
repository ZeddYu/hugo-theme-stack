@echo off
cd exampleSite
hugo server --gc --themesDir=../.. --port=41125 -w -D --disableFastRender
pause
