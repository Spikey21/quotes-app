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
        
        document.querySelector("form").addEventListener("submit", e => {
            e.preventDefault()
            this.processNewQuote()
        })
    }

    showEditor = async () => {
        this.lightbox.classList.toggle("active")
        await this.reloadQuotesList()
    }

    reloadQuotesList = async () => {
        this.removeAllChildNodes(this.quoteList)

        const quotes = await this.getQuotes()
        for (const q of quotes) {
            const quoteHtml = this.getQuoteHtmlListItem(q)
            this.quoteList.appendChild(quoteHtml)
        }
    }

    getQuoteHtmlListItem = (quoteData) => {
        const html = `
            <div class="quote-list-item">
                ${quoteData.author}: ${quoteData.quote}
            </div>
            <div class="quote-list-item-delete">
                <a href="#" quote-id="${quoteData._id}" >X</a<
            </div>
        `

        const li = document.createElement("li")
        li.classList.add("list-item")
        li.innerHTML = html

        li.querySelector("a").addEventListener("click", e => {
            this.deleteQuote(quoteData._id)
        })

        return li
    }

    getQuotes = async () => {
        try {
            const response = await fetch("/api/quotes")
            const data = await response.json()
            return data
        } catch (error) {
            console.error(error);   
        }

        return null;
    }

    removeAllChildNodes(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }
    }

    processNewQuote = async () => {
        if (this.quoteText.value.length === 0 || this.quoteAuthor.value.length === 0) {
            console.error("Data not sufficient")
            return
        }
        const response = await fetch("/api/quote/save", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quote: this.quoteText.value,
                author: this.quoteAuthor.value
            })
        })

        const data = await response.json()
        if (data && data.saved === true) {
            this.reloadQuotesList()
            this.quoteText.value = ""
            this.quoteAuthor.value = ""
        }
    }
}

const quoteEditor = new QuoteEditor()