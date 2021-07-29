// Read the datasets 
Promise.all([
    d3.csv("https://gist.githubusercontent.com/swatiyengar/2a3404a5b99149ecffbfe71b4f72560f/raw/d294784d8dd64e68e0dc5c79a2c3f88c16845d1d/mostexpensive_March2021.csv"),
    d3.csv("https://raw.githubusercontent.com/swatiyengar/privateIslandScraper/main/island_scrape_weekly.csv")
]).then(function(data) {
    let drug
    let ac

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
            islandName = randomIsland['name'];
            islandRegion = randomIsland['region'];
            islandPhoto = randomIsland['image']; //browser should load photo
            islandAcreage = randomIsland['acreage']
            islandTag = randomIsland['tags']
            console.log(islandName)
            console.log(islandAcreage)


        })


    // d3 select <div class=islands> and append the island group information there

    // save the user submitted value of the income slider

    // d3 take the annualcost of the selected drug and divide it by the user's annual income - save this value to nonadjusted_yrwork

    // append this data to <span class="nonadjusted_yrsworked"></span></p>
})