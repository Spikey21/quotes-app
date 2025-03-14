class QuoteEditor {
    constructor() {
        this.init()
    }
    init() {
        this.lightbox = document.querySelector("#lightbox")
        this.quoteText = document.querySelector("#new-quote-text")
        this.quoteAuthor = document.querySelector("#new-quote-author")
        this.quoteList = document.querySelector(".quotes-list")

        document.addEventListener("keyup", e => {
            if (e.key === "e") this.showEditor() 
        })
    }

    showEditor = async () => {
        this.lightbox.classList.toggle("active")
        await this.reloadQuotesList()
    }

    reloadQuotesList = async () => {
        
    }
}

const quoteEditor = new QuoteEditor()