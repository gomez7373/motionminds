!function(e, t, i) {
    class n {
        constructor() {
            if (this.instance)
                return this.instance;

            this.instance = e.a11y = this;
            e.version = this.version = "4.5.12";

            this.init();
        }

        // Initialization of accessibility features
        init() {
            this.initButton();
            this.initAccessibilityModes(); // Add this line to initialize mode changes
        }

        // Method to initialize the accessibility button
        initButton() {
            let t = this.a11yBtn = document.querySelector("#INDmenu-btn");
            t.addEventListener("click", this.openMenu.bind(this));
            t.addEventListener("keypress", this.openMenu.bind(this));
        }

        // Method to open the accessibility menu
        openMenu() {
            let menu = document.querySelector("#INDmenu");
            menu.classList.toggle("open"); // Toggle the menu open/close
            this.a11yBtn.setAttribute("aria-expanded", menu.classList.contains("open"));
            
            // Add this line for debugging
            console.log("Button clicked. Menu state:", menu.classList.contains("open"));
        }

        // Method to initialize accessibility mode changes
        initAccessibilityModes() {
            const paragraph = document.getElementById('intro-paragraph');

            document.getElementById('increaseTextBtn').addEventListener('click', function() {
                paragraph.textContent = "You have enabled increased text size. Use the menu to adjust further or proceed to the checklist.";
            });

            document.getElementById('decreaseTextBtn').addEventListener('click', function() {
                paragraph.textContent = "You have enabled decreased text size. Use the menu to adjust further or proceed to the checklist.";
            });

            document.getElementById('highContrastBtn').addEventListener('click', function() {
                paragraph.textContent = "You have enabled high contrast mode. Use the menu to adjust further or proceed to the checklist.";
                document.body.classList.add('high-contrast');
            });

            document.getElementById('normalContrastBtn').addEventListener('click', function() {
                paragraph.textContent = "You have returned to normal contrast mode. Use the menu to adjust further or proceed to the checklist.";
                document.body.classList.remove('high-contrast');
            });
        }
    }

    document.body ? new n() : (window.addEventListener("DOMContentLoaded", () => {
        i = document.body;
        new n();
    }));
}(window.interdeal = window.interdeal || {}, document.head, document.body);
