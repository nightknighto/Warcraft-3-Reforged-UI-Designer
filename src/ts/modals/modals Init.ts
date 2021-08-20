const modal_container = document.getElementById('modal-container')

export class Modals {

    constructor() {
        this.AboutUs();
        this.Hall_of_Fame();
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
                                                <h3 class="card-title">NightKnight (Deadreyo)</h3>
                                                <h4 class="card-subtitle text-white-50">Some Cool Guy From Afar</h4>
                                                <p class="card-text">A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.</p>
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
                                                <h4 class="card-subtitle text-white-50">No Idea whoever this dude is</h4>
                                                <p class="card-text">Doesn't like when people don't use object oriented design patterns when writing editors.</p>
                                            </div>
                                            <div class="flex-shrink-0">
                                                <img style="width: 200px;" src="./files/AboutUs/insanity.png" alt="icon" class="align-self-center d-flex ml-3 img-thumbnail">
                                            </div>
                                        </div>
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
                                        <p>This is a Web-UI application. It was designed using Electron and coded with HTML/CSS/Typescript. Some elements of the interface were made using Bootrstrap. The application's icon was made by <strong>Wselfwulf</strong>.</p>
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

    Hall_of_Fame() {
        modal_container.innerHTML += `
        <div class="modal fade" id="HallOfFame" tabindex="-1" aria-labelledby="HallOfFame" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header bg-warning">
                        <h4 class="modal-title">Hall of Fame</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-4 d-flex">
                                    <div class="card bg-danger">
                                        <div class="ratio ratio-1x1">
                                            <iframe src="https://www.youtube.com/embed/McoJY_Z882A" allowfullscreen></iframe>
                                        </div>
                                        <div class="card-body">
                                            <h3 class="card-title">Code lock UI</h4>
                                            <h5 class="card-subtitle mb-2 text-white">
                                                Made by FeelsGoodMan
                                            </h5>
                                            <p class="card-text">(GUI) System that enables the user to open locks using numbers.</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="text-black-50">Project: <a target="_blank" href="https://www.hiveworkshop.com/threads/acolyte-of-life.330425/">
                                                Acolyte of Life</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 d-flex">
                                    <div class="card bg-warning">
                                        <div class="ratio ratio-1x1">
                                            <iframe src="https://www.youtube.com/embed/Ov8FzFXnjAY" allowfullscreen></iframe>
                                        </div>
                                        <div class="card-body">
                                            <h3 class="card-title">Trade System</h4>
                                            <h5 class="card-subtitle mb-2 text-white">
                                                Made by NightKnight
                                            </h5>
                                            <p class="card-text">(Typescript) A fully-functional system that enables the user to buy, sell or exchange items.</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="text-black-50">Project: <a target="_blank" href="https://www.hiveworkshop.com/threads/acolyte-of-life.330425/">
                                                Acolyte of Life</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-4 d-flex">
                                    <div class="card bg-success">
                                        <div class="ratio ratio-1x1">
                                            <iframe src="https://www.youtube.com/embed/zaIxuHGEtHc" allowfullscreen></iframe>
                                        </div>
                                        <div class="card-body">
                                            <h3 class="card-title">Quest Log</h4>
                                            <h5 class="card-subtitle mb-2 text-white">
                                                Made by FeelsGoodMan
                                            </h5>
                                            <p class="card-text">(GUI) An interface that displays quests, along with their descriptions.</p>
                                        </div>
                                        <div class="card-footer">
                                            <p class="text-black-50">Project: <a target="_blank" href="https://www.hiveworkshop.com/threads/acolyte-of-life.330425/">
                                                Acolyte of Life</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col-4 d-flex">
                                    <div class="card bg-info">
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
                                        <div class="card-footer">
                                            <p class="text-black-50">Project: <a target="_blank" href="https://www.hiveworkshop.com/threads/acolyte-of-life.330425/">
                                                Acolyte of Life</a>
                                            </p>
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
}


