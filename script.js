// select the area where the movies need to be displayed
const movieBox = document.querySelector('#movieBox')

// FUNCTION: display movies from database
const addMoviesToDom = (movieDatabase) => {
    const createList = movieDatabase.map(movie => {

        movieBox.classList.toggle('favPage', false)

        // create new <li>
        const newLi = document.createElement('li')
        newLi.classList.add('movieWrapper')

        // create new <img>
        const newImg = document.createElement('img')
        newImg.setAttribute('src', movie.Poster)

        // create new <a>
        const newLink = document.createElement('a')
        const baseURL = 'https://www.imdb.com/title/'
        newLink.setAttribute('href', baseURL + movie.imdbID)
        newLink.setAttribute('target', '_blank')

        // create subtitle
        const newTitle = document.createElement('div')
        newTitle.classList.add('subtitle')
        newTitle.innerHTML = movie.Title

        // create favorite button
        const favBtn = document.createElement('div')
        favBtn.classList.add('favBtn', movie.imdbID)
        favBtn.innerHTML = '+ add to Favorites'
        
        // append children
        newLink.appendChild(newImg)
        newLink.appendChild(newTitle)
        newLi.appendChild(newLink)
        newLi.appendChild(favBtn)
        return newLi
    })

    createList.forEach(list => {
        movieBox.appendChild(list)
    })
}

// EVENT: click add to favorites button
const addFavorite = () => {
    document.querySelectorAll('.favBtn').forEach(button => {
        button.addEventListener('click', () => {
        
            // get title of current movie
            const currentTitle = button.parentElement.querySelector('.subtitle').innerHTML
            const currentID = button.classList.item(1)

            console.log(currentTitle)
            if (myFav.includes(currentID)) {
                // if title already in fav list
                document.querySelector('#popUpText').innerHTML = `${currentTitle} is already a favorite`
                document.querySelector('#popUp').style.display = 'block'

            } else {
                // if not...place current movie in favorites list
                myFav.push(currentID)
                // message when favorite added
                document.querySelector('#popUpText').innerHTML = `${currentTitle} has been added to your favorites`
                document.querySelector('#popUp').style.display = 'block'
            }
        })
    })
}

// FUNCTION: filter newest movies
const filterLatestMovies = () => {

    // convert year of all movies to 4 digits
    const convertYear = dataMovie.map(movie => {
        movie.Year = movie.Year.split('_')[0]
        return movie 
    })
    
    // select newest movies
    newestMovie = convertYear.filter(movie => {
        if (movie.Year >= 2014) {
            return movie
        }
    })

    return newestMovie
}

// FUNCTION: filter specific hero movie
const filterMovies = (heroName) => { 
    return dataMovie.filter(movie => movie.Title.includes(heroName))
}

// EVENT: click radiobutton (filter)
document.querySelectorAll('input[type=radio]').forEach(radioBtn => {
    radioBtn.addEventListener('change', (event) => {

        movieBox.innerHTML = ''

        // display selected movies
        switch (event.target.value) {
            case 'filter0':
                addMoviesToDom(dataMovie);
              break;
            case 'filter1':
                addMoviesToDom(filterLatestMovies());
              break;
            case 'filter2':
                addMoviesToDom(filterMovies('Avengers'))
              break;
            case 'filter3':
                addMoviesToDom(filterMovies('X-Men'))
              break;
            case 'filter4':
                addMoviesToDom(filterMovies('Princess'))
              break;
            case 'filter5':
                addMoviesToDom(filterMovies('Batman'))
              break; 
        }
        addFavorite()
    })
})

// FUNCTION: search movie
const searchMovie = () => {
    
    movieBox.innerHTML = ''

    // select entered search value
    const searchValue = document.querySelector('#searchInput').value.toLowerCase()
    // array of movies which match whole title (not case sensitive)
    let fullMatches = dataMovie.filter(movie => movie.Title.toLowerCase().includes(searchValue))
    // array of movies which match part of title (not case sensitive)
    let partlyMatches = dataMovie.filter(movie => movie.Title.toLowerCase().includes(searchValue))

    if (fullMatches.length !== 0) {               // if full title match is found 
        addMoviesToDom(fullMatches)

    } else if (partlyMatches.length !== 0) {      // if partly title match is found
        addMoviesToDom(partlyMatches)

    } else {
        movieBox.innerHTML = "NO MOVIES FOUND"    // if no match is found 
    }  
    
    addFavorite()
}

// EVENT: click search button
document.querySelector('#searchBtn').addEventListener('click', () => {
    // run search function
    searchMovie()

    // clear search bar
    document.querySelector('#searchInput').value = ''
}) 


// CREATE FAVORITE LIST
// in this list movie-titles (of movies marked as favorite) will be stored
let myFav = [];                         

// EVENT: click favorite button (go to favorite movies page)
const favButtons = document.querySelectorAll('.filterFav')
favButtons.forEach(favBtn => {
    
    // select the visible fav button (see media queries)
    if (favBtn.style.display !== "none") {
        favBtn.addEventListener('click', () => {
            
            movieBox.innerHTML = ''

            // create array where fav movies will be placed in
            // myFav contains TITLES ONLY, myFavList contains whole movie objects
            let myFavList = []                                

            // create favorites list
            if (myFav.length === 0) {
                // if favorites list is empty
                movieBox.innerHTML = "NO FAVORITES YET"
            } else {
                // if favorites list is NOT empty
                myFav.forEach(item => {
                    // select current movie title and push into myFavList list
                    const thisMovie = dataMovie.find(movie => movie.imdbID === item)
                    myFavList.push(thisMovie)
                })

                // DISPLAY FAVORITE MOVIES
                myFavList.forEach(favMovie => {

                    // this class changes the style of the movieBox 
                    movieBox.classList.toggle('favPage', true)
                    
                    // create new <li>
                    const newLi = document.createElement('li')
                    newLi.classList.add('favWrapper')

                    // create new <img>
                    const newImg = document.createElement('img')
                    newImg.setAttribute('src', favMovie.Poster)

                    // create new <a>
                    const newLink = document.createElement('a')
                    const baseURL = 'https://www.imdb.com/title/'
                    newLink.setAttribute('href', baseURL + favMovie.imdbID)
                    newLink.setAttribute('target', '_blank')

                    // create movie info
                    const movInfo = document.createElement('ul')
                    const movTitle = document.createElement('li')
                    movTitle.innerHTML = favMovie.Title
                    const movYear = document.createElement('li')
                    movYear.innerHTML = favMovie.Year

                    movInfo.appendChild(movTitle)
                    movInfo.appendChild(movYear)

                    // create remove button
                    const removeBtn = document.createElement('div')
                    removeBtn.classList.add('remove')
                    removeBtn.setAttribute('id', favMovie.imdbID)
                    removeBtn.innerHTML = "REMOVE"
            
                    // append img > a > div
                    newLink.appendChild(newImg)
                    newLi.appendChild(newLink)
                    newLi.appendChild(movInfo)
                    newLi.appendChild(removeBtn)
                    movieBox.appendChild(newLi)
                })
                removeFavorite()
            }
        })
    }
})

// FUNCTION: click remove button (remove movie from favorite list)
const removeFavorite = () => {
    const removeButtons = document.querySelectorAll('.remove')
    removeButtons.forEach(removeBtn => {
        removeBtn.addEventListener('click', () => {
            // remove movie from screen
            removeBtn.parentElement.remove()

            // remove movie from favorite list
            myFav = myFav.filter(movie => removeBtn.getAttribute('id') !== movie)
        })
    })
}

// EVENT: close pop-up
const closeButton = document.querySelector('#closeBtn')
closeButton.addEventListener('click', () => {
    document.querySelector('#popUp').style.display = 'none'
})

// DEFAULT: make landingpage work
addMoviesToDom(dataMovie);
addFavorite()