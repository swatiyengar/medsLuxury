// Read the datasets 
Promise.all([
    d3.csv("https://gist.githubusercontent.com/swatiyengar/2a3404a5b99149ecffbfe71b4f72560f/raw/d294784d8dd64e68e0dc5c79a2c3f88c16845d1d/mostexpensive_March2021.csv"),
    d3.csv("https://raw.githubusercontent.com/swatiyengar/privateIslandScraper/main/island_scrape_weekly.csv")
]).then(function(data) {
    let drug
    let ac

    var formatComma = d3.format(","),
        formatDecimal = d3.format(".1f"),
        formatDecimalComma = d3.format(",.2f"),
        formatSuffix = d3.format("s"),
        formatSuffixDecimal1 = d3.format(".1s"),
        formatSuffixDecimal2 = d3.format(".2s"),
        formatMoney = function(d) { return "$" + formatComma(d); },
        formatPercent = d3.format(",.2%");

    const dataRx = data[0]
    const dataIsland = data[1]


    // .map = goes through every data point and says, pull out your drug - list comprehension...maps every row of old data set and puts it into the new dataset; then new set creates a new uniquelist from an existing list

    let options = new Set(dataRx.map(d => d.drug))


    //d3 selects our element with drug id
    d3.select('.drug')
        //Go and select our future "option" with the class "opt"
        .selectAll('option.opt')
        //Bind our data to that selection
        .data(options)
        // enter/append the data to the selection
        .join('option')
        //Give that option a class
        .attr('class', 'opt')
        //Set the value as d which in this case is the drug
        .attr('value', d => d)
        //Set the text as d which in this case in the drug
        .text(d => d);

    //Select the button
    d3.select('button')
        //give it an on click event
        .on('click', function() {
            //Selects island_intro and the blurb and hides
            d3.selectAll('.island-intro, .blurb, .affordability').classed('hide', false)
                //save drug name for next d3 calculation
            drug = d3.select('.drug').node().value
            console.log(drug)
            d3.select('.selected-drug').text(drug)


            //save annualcost to variable
            dataRx.map(function(d) {
                if (d['drug'] === drug) {
                    ac = +d['annualcost']
                    return ac
                }
            })

            // const formatMoney = function(d) { return "$" + formatDecimalComma(d); }

            d3.select('.selection-annualcost').text(ac).text(function() { return formatMoney(ac); })



            console.log(ac)
                //Filter island data sold at a price less than annualcost variable
            let filtered = dataIsland.filter(function(d) {
                if (+d['price'] <= ac) {
                    return d
                }
            })
            console.log(filtered)

            //choose one random island instead of listing all of them
            let randomIsland = filtered[Math.floor(Math.random() * filtered.length)];
            console.log(randomIsland)

            // d3 group the information about these islands where:
            // let islandGroup = {
            //     islandName: randomIsland['name'],
            //     islandRegion: randomIsland['region'],
            //     islandPhoto: randomIsland['image'], //browser should load photo
            //     islandAcreage: randomIsland['acreage'],
            //     islandTag: randomIsland['tags']
            // }

            // d3 group the information about these islands where:
            islandName = randomIsland['name'],
                islandRegion = randomIsland['region'],
                islandPhoto = randomIsland['image'], //browser should load photo
                islandAcreage = randomIsland['acreage'],
                islandTag = randomIsland['tags']

            console.log(randomIsland['name'])

            // console.log(islandGroup)

            //Group of nominations to which different elements are added
            const group = d3.select('.nominations-sentence')


            //Selects nomination class from HTML
            //     d3.select('.nominations-sentence')
            //     .selectAll('.nomination')
            //Removes existing elemnts at each click
            //     .remove()

            d3.select('.islands')
                //Selects nomination class from HTML again (grab everything that is the class of nomination) - every span gets a row of the data

            //Tells d3 what data is about to be bound
            .data(randomIsland)
                .enter()
                .append("text")
                .attr('class')
                .text(randomIsland['name'])
                //Creates the selection - are some of the data points lonely? only affects the new
                //    .enter()
                //Updates the selection such that the correct data elements appear - if lonely, add a span
                //    .append('span')
                //    .join removes the need for enter/append unless transitions are involved
                // .join('class')
                // //  gives the data a class
                // .attr('class', 'islandName')
                // //  tells the page to the display an element of the data
                // .text(d => d.randomIsland);


            // //  Select the element with the class movie
            // d3.select('.movie')
            //     //  And set the text as the name of the first element
            //     .text(winner[0].Name);
        })



    // d3 select <div class=islands> and append the island group information there

    // save the user submitted value of the income slider

    // d3 take the annualcost of the selected drug and divide it by the user's annual income - save this value to nonadjusted_yrwork

    // append this data to <span class="nonadjusted_yrsworked"></span></p>
})