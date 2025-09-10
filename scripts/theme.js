async function themeGet(category_id)
{
    console.log('category id = ' + category_id);
    //starts performance monitor
    var t0 = performance.now();

    try {
        // Use dataService to get themes for this category
        const themesData = await window.dataService.getThemes(category_id);
        
        // themesData is an array with themes and load time as last element
        const loadTime = themesData.pop();
        const items = themesData;
        
        console.log('fetched from local data ' + loadTime + ' ms');
        if (items && items.length > 0) {
            //makes the top of the website
            var Temp = '<div class="title">Velg tema</div><div class="top1">';
            //repeats this until all of the data is in boxes
            items.forEach((itemData) => {
                Temp += '<div class="box">';
                Temp += '<div class="box-1n3">' + itemData.Name + '</div>';
                Temp += '<div class="box-info">' + itemData.about + '</div>';
                Temp += '<div class="box-1n3"><button class="btn" id="' + itemData.ID + '" onClick="game(this.id)">velg</button> </div>';
                Temp += '</div>'
            });
            //stops performance timer
            var t1 = performance.now();
            //makes the bottom bar with performance
            Temp += '</div><!-- 1/2 1 = hovedside, kategori velging, spillsiden 2 = spørsmålet, sanheten --> <div class="bottom"> data load: ' + (~~loadTime) + ' ms page build: ' + (~~(t1 - t0)) + ' ms</div>';
            //inserts the html into the document
            document.getElementById("main").innerHTML = Temp;
        }
    } catch (error) {
        console.error('Error fetching theme data:', error);
        document.getElementById("main").innerHTML = '<div class="title">Error</div><div class="top1"><p>Could not load themes for this category.</p></div>';
    }
}