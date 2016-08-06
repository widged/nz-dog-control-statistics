https://beta.data.govt.nz/dataset/dog-control-statistics

# Description

This information has been collected from three sources:

dog, owner, registration and infringement information from the National Dog Database (NDD) at the Department of Internal Affairs
dog-related injury claims and their cost from the Accident Compensation Corporation
prosecutions and dog destruction orders under the Dog Control Act 1996 from the Ministry of Justice

# Links

The page links to -- see lc-dog-profile

Dog Control Statistics (XLSX) -- http://www.localcouncils.govt.nz/lgip.nsf/Files/Excel/$file/Dog%20control%20statistics.xlsx
Dog Control Statistics (XLSX) -- http://www.localcouncils.govt.nz/lgip.nsf/Files/Excel/$file/Dog_control_statistics.csv

# Data

On your command line, run `_fetch-files` to download all data dependencies

    ./_fetch-files.js

# Automated data cleaning

See the wrangling folder:

Rapidly check the structure of the data :

    ./explore-data-structure.r > data-structure.log

Clean up and reformat the data to make them easier to use in a web app. 

    ./reformat.r

This will save two files. `saved/renamed.tsv` renames some column names and factor levels for legibility. `saved/shrunk.tsv` provides a more compact version of the data, easier to load in web apps. 