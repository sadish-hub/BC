Use VS Code for Developmentas much as possible. I dont want to use VS that is licensed product. 


Its a .Net Core 3.0 react redux SPA project. Apart from that it EF CORE 3.0 (Code first approach as i'm trying Domain driven development), Automapper, Sql Server.

Once you have downloaded the code, Run the following commands in the path of the .csproj file:

dotnet restore
dotnet build


Since its code first approach, you dont need to create tables. Go to Migrations and you can the list of migrations done so far:

Before you execute commands, go and change the connectionstring in the appsettings.development.json

I'm still looking for neat way of doing automatic migrations of EF Core 3.0. Untill then, Execute the below commands in the order to create the tables in the db. If EF commands are not working run "dotnet tool install --global dotnet-ef --version 3.0.0"

dotnet ef migrations add InitialMigration --context BrightChoiceContext
dotnet ef database update --context BrightChoiceContext

However DO NOT Commit the migrations code.

Omnisharp is an opensource C# extension which can be used in VS Code, Sublime, Atom etc. Install C# extension from VS code extensions.

Since .Net core 3.0 released on 09/23/2019 which is 5 days ago, VS code hasn't integrated the latest Omnisharp. So there will be lots of red lines. But the dotnet build command is successful. This is because dotnet build runs like linux and pick the assets from obj/project.assets.json. 

To resolve it go to settings.json of VS Code and add "omnisharp.path": "1.34.4-beta.7" and restart omnisharp. Now you are all set. Run "dotnet run" command which will automatically do npm install. Waitg for a few mins and browse https://localhost:5001

To debug (first stop if its running in command line) , click ctrl+shift+D and click run.You can see breakpoints are getting hit from the request. Though there is a minor flaw, if you make a change and run the debug it wont give you the latest changes. So run dotnet build in command line and clikc debug. I tried with PreLaunchTask in launch.json, but no luck. If you are able to figure it out, please let me know.

Happy Coding!!
