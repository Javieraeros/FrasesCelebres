var quoteBuilder = {
    key: "propiaCita",
    expires: (24*60*60),
    index: Math.floor(Math.random() * quotes.length),
    get: function() {
        if (typeof(Storage) !== "undefined") {
            this.check().build();
        }
        else {
            console.log("WTF? Your browser do not support localStorage. Everything will be random");
            this.build();
        }
    },
    store: function(index) {
        var now = Date.now();
        var schedule = now + this.expires * 1000;
        var data = {value: this.index, expires: schedule};
        localStorage.setItem(this.key, JSON.stringify(data));
        return this;
    },
    check: function() {
        var now = Date.now();
        var data = localStorage.getItem(this.key);
        data = JSON.parse(data);

        if (data !== null) {
            var expires = data.expires;

            if (data.expires < now) {
                return this.removeStorage();
            }
            else {
                this.index = data.value;
                return this;
            }
        }
        else {
            return this.store();
        }
    },
    removeStorage: function() {
        localStorage.removeItem(this.key);
        return this.store();
    },
    build: function() {
        if(typeof quotes[this.index] !== 'undefined') {
            quote = quotes[this.index];
            this.insertDOM(quote);
        }
    },
    insertDOM: function(item) {
        var dom_quote = document.getElementById('quote');
        var dom_author = document.getElementById('author');

        item.quote.forEach(function(key, value){
            var p = document.createElement("p");
            var t = document.createTextNode(key);
            p.appendChild(t);
            dom_quote.appendChild(p);
            dom_quote.insertBefore(p, dom_author);
        });

        dom_author.innerHTML = item.author;
    }
};
