#!/usr/bin/env Rscript

dogs <- read.csv("../downloaded/dogcontrolstatistics.csv", header = TRUE)

# There is a lot of repetition in the table. Aggregated data are provided along with the data at lower resolution. 
# To remove them consider
exclude <-  function(blah) {
	df = subset(dogs, dogs$Council != 'New Zealand' 
					& dogs$Subcategory != 'aa_all (pure)'
					& dogs$Subcategory != 'all pure and cross breeds'
					& dogs$Subcategory != 'under the Dog Control Act 1996'
					& dogs$Subcategory != 'total'
					& dogs$Item != '1001_total'
			)
}

