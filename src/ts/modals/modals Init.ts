import bootstrap = require("bootstrap");

const modal_container = document.getElementById('modal-container')
export class Modals {

    constructor() {
        this.AboutUs();
        this.Hall_of_Fame();
        this.Changelog();
        this.Documentation();
        this.Documentation_online();
    }

    AboutUs() {
        modal_container.innerHTML = `
            <div class="modal fade" id="AboutUs" tabindex="-1" aria-labelledby="AboutUs" aria-hidden="true">
                <div class="modal-dialog modal-xl">
                    <div class="modal-content">
                        <div class="modal-header bg-info">
                        <h4 class="modal-title">About Us</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                        </button>
                        </div>
                        <div class="modal-body text-white">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card bg-success">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-shrink-0">
                                                    <img style="width: 200px;" src="./files/AboutUs/night.png" alt="icon" class="align-self-center d-flex mr-3 img-thumbnail">
                                                </div>
                                                <div class="flex-grow-1 ms-3">
                                                    <h3 class="card-title">NightKnight</h3>
                                                    <h4 class="card-subtitle text-white-50">Founder of the WC3 UI Designers Inc. & CEO of the Knights League</h4>
                                                    <p class="card-text mt-2">I guess I technically am a Web Developer now. Not as boring as I always imagined I guess. (Atwa)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <div class="card bg-success">
                                        <div class="card-body">
                                            <div class="d-flex align-items-center">
                                                <div class="flex-grow-1 ms-3">
                                                    <h3 class="card-title">Insanity_AI</h3>
                                                    <h4 class="card-subtitle text-white-50">Some dude who happens to be a Co-developer</h4>
                                                    <p class="card-text mt-2">Doesn't like when people don't use object oriented design patterns when writing editors.</p>
                                                </div>
                                                <div class="flex-shrink-0">
                                                    <img style="width: 200px;" src="./files/AboutUs/insanity.png" alt="icon" class="align-self-center d-flex ml-3 img-thumbnail">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <div class="card bg-warning text-black">
                                        <div class="card-header">
                                            <h2 class="card-title">Support Us <span class="fa fa-heart text-danger"></span></h2>
                                        </div>
                                        <div class="card-body">
                                            <p>The development of this application consumes a great deal of our energy and time. If you like it, please consider supporting us!</p>
                                            <a class="btn btn-primary" target="_blank" href="https://www.patreon.com/WC3UIDesigner">Patreon</a>
                                            <p class="mt-2">You also support us by sharing this application with others
                                                and by giving us credits in your project!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <div class="card bg-secondary">
                                        <div class="card-header">
                                            <h2 class="card-title">Overview</h2>
                                        </div>
                                        <div class="card-body">
                                            <p class="card-text">
                                                <h5 class="text-warning">Warcraft 3 Reforged UI Designer</h5>
                                                is a tool made to create User Interface designs for Warcraft 3 Maps using graphical elements. The application revolves around the the concept of <em>(What You See Is What You Get)</em>
                                                , as the product will be a typical copy of what is on the screen. It produces code in a file that can be opened by a text editor, then copied and pasted into a World Editor trigger or Custom Script. It works on Warcraft III version 1.31+</p>
                                            <p>The main goal of the application is to take WC3 UI modding to the next level, by facilitating UI creation and allowing anyone to design their own unique UI, <strong>without any prerequisite coding knowledge</strong>. This application is made to be used by GUI coders, Jass coders, LUA coders and Typescript coders. For Typescript, it is specifically made to work with <a class="link-info" href="https://github.com/cipherxof/wc3-ts-template" target="_blank">TriggerHappy's TSTL template</a>.
                                            </p>
                                            <h5 class="text-warning">Expectations</h5>
                                            <p>This application and UI Modding together have unlimited potential. As it gets more and more known and used, it will gradually revolutionize the whole modding scene, and become a core part of making any map. <strong class="text-warning">This is the future of Map Development.</strong></p>
                                            <h5 class="text-warning">Usage</h5>
                                            <p>You are free to use the application however you desire. We are not held responsible for the usage of the application in any inappropriate applications or products.</p>
                                            <p class="text-info">Please give credits to the application when using it. It helps us so much!</p>
                                        </div>
                                        <div class="card-footer text-white-50">
                                            <p>This is a Web-UI application. It was designed using Electron and coded with HTML/CSS/Typescript. Some elements of the interface were made using Bootstrap. The application's icon was made by <strong>Wselfwulf</strong>.</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 mt-3">
                                    <div class="card bg-secondary">
                                        <div class="card-header">
                                            <h2 class="card-title">History</h2>
                                            <h6 class="text-white-50">Everything here is from NightKnight's Perspective</h6>
                                        </div>
                                        <div class="card-body">
                                            <h5 class="text-warning">Origination of the Idea</h5>
                                            <p>With the arrival of WC3 v1.31 and the introduction of UI, I was certain the game developers would create an editor in which UI could be designed graphically. When Reforged hit, everything was a mess and I realized that was not going to happen, and that I would have to learn a coding language in order to make use of frames.
                                                <p>
                                                    Thankfully at that point, I had already learnt Jass. However, the coding of Frames and UI was not easy. You had to put random numbers as positions and dimensions, test it to see how it looked like, then start numerous tests to achieve the position or dimension you desired. It was a painful process, which was exacerbated when I moved on to Typescript. I had to wait between 30 to 60 seconds for each test to begin.
                                                </p>
                                                <br>Another issue was the fact that after taking a rest from coding UI, I would forget how I used to create stuff and what worked and what did not. These were not just my issues, these were the issues many faced.
                                            </p>
                                            <h5 class="text-warning">Creating the Application</h5>
                                            <p>The idea of the graphical UI designing came back to me, and fortunately I had already learnt a useful coding language (Typescript). I started messing around with Electron, put some text and number fields, an ingame screenshot and made a feature that inserted little images onto the screenshot. Things were slow, I was still learning how to work with electron and Web-UI.
                                                <p>
                                                    Unfortunately, I didn't really receive the support I expected from the community. It was like some people didn't really care about what this application could introduce, while the most were very skeptical and doubted I could actually make something useful and working. However, I just pushed forward and continued putting time and effort into it.
                                                </p>
                                                <p>
                                                    Then one day, I was thinking about getting someone to work with me on this project. I randomly sent an invitation to Insanity_AI -because he was always nice to me- even though I was almost sure he would refuse becaue he quit WC3. For some reason, he accepted, and I was baffled. I had to take some time to believe it.
                                                </p>
                                                <br>Starting from that moment, development accelerated alot, and here we are now, successfully made the application that shall affect the modding scene.
                                            </p>
                                        </div>
                                        <div class="card-footer text-white-50">
                                            <p>Learning Typescript -to create some maps- was the main reason I was able to get into Web Development and create this application. I highly encourage to move on from GUI or Jass into Typescript.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div> 
                    </div>
                </div>
            </div>`
    }

    Changelog() {
        modal_container.innerHTML += `<div class="modal fade" id="ChangeLog" tabindex="-1" aria-labelledby="HallOfFame" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-success">
                        <h4 class="modal-title">Change Log</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-12">
                                    <div class="card bg-secondary">
                                        <h2 class="card-header text-white">v 2.0.0</h2>
                                        <div class="card-body">
                                            <div class="row justify-content-center">
                                                <div class="col-5 card-text p-4">
                                                    <ul class="list-group border border-danger border-2">
                                                        <li class="list-group-item list-group-item-primary">New: Undo/Redo</li>
                                                        <li class="list-group-item list-group-item-primary">New: Text Frames</li>
                                                        <li class="list-group-item list-group-item-primary">New: Tooltips</li>
                                                        <li class="list-group-item list-group-item-primary">New: Typescript Export</li>
                                                        <li class="list-group-item list-group-item-primary">New: Info Tab</li>
                                                        <li class="list-group-item list-group-item-primary">New: About Us page</li>
                                                        <li class="list-group-item list-group-item-primary">New: Hall of Fame page</li>
                                                        <li class="list-group-item list-group-item-primary">New: Change Log page</li>
                                                        <li class="list-group-item list-group-item-primary">New: Parent Array option for TableA.</li>
                                                        <li class="list-group-item list-group-item-primary">Buttons: Lose Focus After Clicks</li>
                                                    </ul>
                                                </div>

                                                <div class="offset-1 col-5 card-text p-4">
                                                    <ul class=" list-group border border-danger border-2">
                                                        <li class="list-group-item list-group-item-primary">Backward and Forward Support</li>
                                                        <li class="list-group-item list-group-item-primary">New: Ability to give array names</li>
                                                        <li class="list-group-item list-group-item-primary">TableArray: counting system changed</li>
                                                        <li class="list-group-item list-group-item-primary">Improved App's buttons</li>
                                                        <li class="list-group-item list-group-item-primary">More Game-UI General Options</li>
                                                        <li class="list-group-item list-group-item-primary">Frame Border: now semi-transparent</li>
                                                        <li class="list-group-item list-group-item-primary">Improved user experience for text fields</li>
                                                        <li class="list-group-item list-group-item-primary">TableArray: frames are produced as an array</li>
                                                        <li class="list-group-item list-group-item-primary">Width/Height Limit: decreased to 0.01</li>
                                                    </ul>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>`
    }

    Hall_of_Fame() {
        console.log('began')
        fetch('https://deadreyo.github.io/RUID-Hall-Of-Fame/')
        .then(res => res.text())
        .then(body => {
            modal_container.innerHTML += body
            console.log(body)
        })
    }

    Documentation() {
        const data = `<div class="modal fade" id="Tutorial" tabindex="-1" aria-labelledby="Tutorial" aria-hidden="true">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-primary">
                    <h4 class="modal-title text-white">Tutorials & Documentation</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <div class="card bg-secondary">
                                    <h2 class="card-header text-white">Tutorials</h2>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="card bg-info border border-danger border-3">
                                                <div class="card-body">
                                                    <div class="d-flex align-items-center">
                                                        <div style="width: 100%;">
                                                            <div class="ratio ratio-4x3">
                                                                <iframe src="https://www.youtube.com/embed/Ov8FzFXnjAY" allowfullscreen></iframe>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 ms-3">
                                                            <h3 class="card-title">Element Creation, Editing & Insert Menu</h4>
                                                            <p class="card-text">Explaining Insert Menu options, buttons, backdrops, texts, how to add, modify or delete them, and most features.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row mt-4 justify-content-center">
                                            <div class="col-4 d-flex">
                                                <div class="card bg-info border border-danger border-3">
                                                    <div class="ratio ratio-1x1">
                                                        <iframe src="https://www.youtube.com/embed/McoJY_Z882A" allowfullscreen></iframe>
                                                    </div>
                                                    <div class="card-body">
                                                        <h3 class="card-title">Introduction & Menu Options</h4>
                                                        <p class="card-text">Explaining application's interface, then menus and their options.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4 d-flex">
                                                <div class="card bg-info border border-danger border-3">
                                                    <div class="ratio ratio-1x1">
                                                        <iframe src="https://www.youtube.com/embed/zaIxuHGEtHc" allowfullscreen></iframe>
                                                    </div>
                                                    <div class="card-body">
                                                        <h3 class="card-title">Creating a Shop UI</h4>
                                                        <p class="card-text">An example on how to create a shop UI.</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-4 d-flex">
                                                <div class="card bg-info border border-danger border-3">
                                                    <div class="ratio ratio-1x1">
                                                        <iframe src="https://www.youtube.com/embed/lN9fAUHVFaI" allowfullscreen></iframe>
                                                    </div>
                                                    <div class="card-body">
                                                        <h3 class="card-title">Combat Formation</h4>
                                                        <h5 class="card-subtitle mb-2 text-white">
                                                            Made by FeelsGoodMan
                                                        </h5>
                                                        <p class="card-text">(GUI) Interface designed to edit the formattion of the </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-5">
                            <div class="col-12">
                                <div class="card bg-secondary">
                                    <h2 class="card-header text-white">Documentation</h2>
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="accordion">
                                                <div class="accordion-item">
                                                  <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                                                    <button class="accordion-button collapsed bg-warning" type="button" data-bs-toggle="collapse" data-bs-target="#accordionAppMenu" aria-expanded="true" aria-controls="accordionAppMenu">
                                                      Application's Menus & General Functionalities
                                                    </button>
                                                  </h2>
                                                  <div id="accordionAppMenu" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingOne">
                                                    <div class="accordion-body bg-dark text-white">
                                                        <h5>File menu</h5>
                                                            <ol>
                                                                <li><strong>New</strong>: deletes everything inside the application.</li>
                                                                <li><strong>Open</strong>: loads a saved file.</li>
                                                                <li><strong>Save</strong>: saves the current project into a file.</li>
                                                                <li><strong>Export</strong>: creates a file and produces the code in the chosen language. This file can be opened with any text editor like Notepad. All you have to do is copy all and paste into an empty Custom Script.</li>
                                                            </ol>
                                                            Note: In case of LUA, you will need a custom script in a trigger that runs on Map Initialization.
                                                            <em>Custom Script: LibraryName.Initialize()</em>
                                                        
                                                        <hr>
                                                        <h5>Edit menu</h5>
                                                            <ol>
                                                                <li><strong>Undo</strong>: undo the last action you did. It does NOT undo edits to text fields (like text, trig_var, textures) except Name.</li>
                                                                <li><strong>Redo</strong>: redo the action that was undo-ed.</li>
                                                            </ol>
                                                            Note: Undo-ing then making a new change will delete the Redo log.
                                                        
                                                        <hr>
                                                        <h5>View menu</h5>
                                                        
                                                            Nothing yet.
                                                        
                                                        <hr>
                                                        <h5>Insert menu</h5>
                                                            <ol>
                                                                <li><strong>Button</strong>: clicking on it creates a Custom Button. Clicking on the dropdown thing will open the dropdown menu.
                                                                    <ul>    
                                                                        <li>Custom Button: This button can have custom texture.</li>
                                                                        <li>Script Dialog Button and Browser Button: premade ready-to-use button templates that can have a custom text inside.</li>
                                                                        <li>Invis Button: An invisible button that can be clicked. This has a lot of interesting applications, such as putting an Invis button over a backdrop.</li>
                                                                    </ul>
                                                                </li>
                                                        
                                                                <li><strong>Backdrop</strong>: (What is a Backdrop? A backdrop is basically an image that can't be interacted with) clicking on it creates a Custom Backdrop. Clicking on the dropdown thing will open the dropdown menu.
                                                                    <ul>
                                                                        <li>Custom Button: This backdrop can have custom texture.</li>
                                                                        <li>All others: premade ready-to-use backdrop templates.</li>
                                                                    </ul>
                                                                </li>

                                                                <li><strong>Text</strong>: clicking on it creates a Text Frame. Text Frames are basically just texts, that can be put above anything or anywhere.</li>
                                                        
                                                        
                                                                <li><strong>Others</strong>: Includes special types of frames. This will contain more things later on.</li>
                                                            </ol>
                                                        
                                                        <hr>
                                                        <h5>Info menu</h5>
                                                            <ol> 
                                                                <li><strong>About Us</strong>: Brief description of who we are, how to support us, overview of the application and history.</li>
                                                                <li><strong>Hall of Fame</strong>: explained <a target="_blank" href="https://www.hiveworkshop.com/threads/warcraft-3-reforged-ui-designer-ruid.334868/">here</a>.</li>
                                                                <li><strong>Change Log</strong>: Any changes will be put here.</li>
                                                            </ol>
                                                
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="accordion-item">
                                                  <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                                                    <button class="accordion-button bg-warning collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionElement" aria-expanded="false" aria-controls="accordionElement">
                                                      Element Panel & Modifying an Element
                                                    </button>
                                                  </h2>
                                                  <div id="accordionElement" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                                                    <div class="accordion-body bg-dark text-white">
   

                                                        The panel on the left is called Element Panel. It contains all the features to modify and edit the elements.
                                                        <ul>
                                                            <li><h5>General Options:</h5> <em>If nothing is selected (or Origin is selected), these options will be available.</em>
                                                                <ol>
                                                                <li><strong>Library Name:</strong> This allows you to set the name of the project. If more than 1 project is used in the same map, they must have different Library Names.</li>
                                                                <li><strong>Hide Full Game UI:</strong> This hides all the default game UI.</li>
                                                                <li><strong>Hide Chat:</strong> This will make players' messages not visible. Basically no one will be able to see other players' messages.</li>
                                                                </ol>
                                                            </li>

                                                            <li><h5>Universal Fields: These fields are available in most frames.</h5>
                                                                <ol>
                                                                <li><strong>Name:</strong> Specifies the name of this frame. This name can be used to get that frame when coding. Special characters and spaces are NOT allowed. Array naming however is allowed. You can turn the frame into an array by giving it an index. This is only useful for manual coding. Example: Frame[00]. Index 00 must exist in order to write other indices.</li>
                                                                <li><strong>Parent:</strong> The element will be a "child" to the selected element. PARENT-CHILD Relation: The concept is like putting an image inside another. The child will always be above the parent (although this behavior is not made inside the app. You may need to save and re-open the file for the correct order to be displayed), and if the parent is hidden (by manual code or through Tooltip), 
                                                                    all its children are hidden with it. Basically if you have a background and want a button and text inside it, then the button and text both should be children to the background. Another note: When creating elements, they are made as children to the currently selected element.</li>
                                                                <li><strong>Tooltip:</strong> This functionality makes the element as a tooltip to the PARENT. Basically, the element will be default hidden ingame, and will only appear when the user's mouse hover over the Parent frame. Buttons can NOT be tooltips. Elements with Origin as Parent can not also be tooltips. A Parent can have only ONE tooltip. A tooltip can NOT itself have a tooltip.</li>
                                                                <li><strong>X/Y:</strong> specifies the location of the element.</li>
                                                                <li><strong>Width/Height:</strong> specifies the dimensions of the element. Minimum is 0.01, although buttons' may not be compatible with extremely small sizes (they will look wierd).</li>
                                                                </ol>
                                                            </li>

                                                            <li><h5>Buttons Fields:</h5>
                                                                <ol>
                                                                <li><strong>Text:</strong> For some buttons, this field is available. This will change the text displayed inside the button.</li>
                                                                <li><strong>Triggered Variable:</strong><ul>
                                                                    <li>This functionality allowes for GUI-triggers to be attached to buttons and run on button clicks. It uses a (type: real) variable that can be detected by th event ("Game - Value of Real Variable") in order to run the GUI trigger.</li>
                                                                    <li>First step is, make a GUI variable of type Real inside world editor, then put the it's name inside the field with the prefix "udg_". For example, a variable with name "testVar" should be put inside the field as "udg_testVar".</li>
                                                                    <li>Second step is, make a GUI trigger with the event ("Game - Value of Real Variable") and put in the variable.</li>
                                                                    <li>Third step is, put the actions you want. Note: when the trigger runs, this variable will hold the NUMBER of the clicking player. Basically, if blue clicked the button, the variable's value will be 2 (his number). If red clicks the button, it will be 1 (his number). You can detect the clicking player with this.</li>
                                                                    <li>Fourth step, after putting in your actions, make a line that SETS the value of the variable to 0, so that it can detect the next click.</li>
                                                                    <li>P.S.: You can leave this field empty if you dont want the functionality.</li></ul>
                                                                </li>
                                                                </ol>
                                                            </li>

                                                            <li><h5>Text Fields:</h5>
                                                                <ol>
                                                                <li><strong>Text:</strong> Allows for much more text as well as multi-line texts. The behavior of this functionality is very close to the ingame behavior, including the line breaks and overflows.</li>
                                                                <li><strong>Scale:</strong> Controls the scale of the text. Note: the scale of the text is close but NOT identical to the text insice WC3. It will be a little different. In WC3, changing the scale also affects the position of the frame, so you may need to test and adjust scale and position for best results.</li>
                                                                <li><strong>Text Color:</strong> Changes the color of the text.</li>
                                                                </ol>
                                                            </li>

                                                            <li><h5>Buttons/Custom Backdrops fields:</h5>
                                                                <ol>
                                                                <li><strong>Texture Path (the first field):</strong> This is responsible for the appearance of the element INSIDE the application. It does NOT accept BLP files. This is fully for you to see what you're doing.</li>
                                                                <li><strong>Texture Path WE (the second field):</strong> This is responsible for the appearance of the element INGAME. You put the path of the texture you want in this field. You get the path from the Import Editor just like how you choose path for icons and stuff. Note: If the path contains single slashes "/" it will not work. You need to replace it with double slashes "//". Example: If the path is "images/icon.blp" then in the field it should be put as "images//icon.blp"</li>
                                                                </ol>
                                                            </li>

                                                            <li><h5>Context Menu (Right-Click Menu):</h5>
                                                                <ol>
                                                                <li><strong>Delete:</strong> Deletes the selected element.</li>
                                                                <li><strong>Duplicate:</strong> Makes a copy of the selected element with the same data and properties.</li>
                                                                <li><strong>CircularArray:</strong> Makes multiple copies of the selected element in a circular path around the selected element. It can also create elements in the same position by having Radius equal to zero. Helpful for making inventory tooltips.</li>
                                                                <li><strong>TableArray:</strong> Makes multiple copies of the selected element in a table shape. X-Gap and Y-Gap are the lengths of the distances between the elements.
                                                                    <ul><li>For both Array options, the elements are created as an array (notice their names). If the selected element to be Array-Duplicated has an array Parent, the option Array Parent will be unlocked. This option automatically assigns each element of the created array to the element of the parent array with the same index.</li></ul>
                                                                </li>
                                                                    
                                                                </ol>
                                                            </li>

                                                        </ul>

                                                        <p class="fw-bold">Note: Sometimes fields may not be automatically refreshed when doing certain actions. Clicking on the frame will refresh it and it's fields.</p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="accordion-item">
                                                  <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                    <button class="accordion-button bg-warning collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionTree" aria-expanded="false" aria-controls="accordionTree">
                                                      Tree Panel
                                                    </button>
                                                  </h2>
                                                  <div id="accordionTree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                    <div class="accordion-body bg-dark text-white">
                                                        <p>The panel on the right is the Tree Panel. It shows the hierarchy of your project and the relations between frames.
                                                            <br>Tip: Clicking on a name will select that frame. </p>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="accordion-item">
                                                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                                      <button class="accordion-button bg-warning collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#accordionFeedback" aria-expanded="false" aria-controls="accordionFeedback">
                                                        Feedback Panel
                                                      </button>
                                                    </h2>
                                                    <div id="accordionFeedback" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                                                        <div class="accordion-body bg-dark text-white">
                                                            This bar gives you alot of feedback while you're working.
                                                            <ol>
                                                                <li><strong>The White Text part:</strong> Most actions will give you a feedback or errors here. You can also know what was done through it.</li>
                                                                <li><strong>Game X/Y:</strong> This displays the WC3 coordinates of your mouse cursor. You can use this to measure distances between points or determine a certain location. Point (0,0) lies bottom left, while point (0.8,0.6) is on top right. Width of the creation area is 0.8, and the height is 0.6</li>
                                                            </ol>
                                                        </div>
                                                    </div>
                                                  </div>
                                              </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    </div>`

        modal_container.innerHTML += data;

    }

    Documentation_online() {
        console.log('began')
        fetch('https://deadreyo.github.io/RUID-Hall-Of-Fame/tutorial.html')
        .then(res => res.text())
        .then(body => {
            modal_container.innerHTML = ""
            this.AboutUs();
            this.Changelog();
            this.Hall_of_Fame();
            modal_container.innerHTML += body
            this.WelcomePage();
        })
    }

    WelcomePage() {
        fetch('https://deadreyo.github.io/RUID-Hall-Of-Fame/welcome.html')
        .then(res => res.text())
        .then(body => {
            modal_container.innerHTML += body
            const modal = new bootstrap.Modal(document.getElementById('Welcome'))
            modal.show();
        })
    }
}


