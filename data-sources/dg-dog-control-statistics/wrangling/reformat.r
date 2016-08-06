#!/usr/bin/env Rscript

library(reshape2)

df <- read.csv("../downloaded/dogcontrolstatistics.csv", header = TRUE)

names(df)[names(df)=="Dog.control.statistics.category"] <- "Category"
names(df)[names(df)=="Council.name"] <- "Council"


df$Value <- as.numeric(df$Value)

levels(df$Category)[levels(df$Category)=="A_Registered dogs (total)"] <- "DOG"
levels(df$Category)[levels(df$Category)=="B_Registered pure breed"] <- "DOG" # redudant with "aa_all (pure)" or any specific breed name
levels(df$Category)[levels(df$Category)=="C_Registered cross breed"] <- "DOG" # redudant with "all (cross)"
levels(df$Category)[levels(df$Category)=="D_Owners"] <- "OWN"
levels(df$Category)[levels(df$Category)=="E Ministry of Justice Statistics"] <- "JST"
levels(df$Category)[levels(df$Category)=="F Accident Compensation Corporation Statistics"] <- "ACC"

# Pure dog, at the same level as Beagle, Terrier, etc.
levels(df$Subcategory)[levels(df$Subcategory)=="zz_other (pure)"] <- "_Unidentified_"

# Any factor that is actually completely redundant (and takes up unnecessary disk space) is replaced with '_'

levels(df$Subcategory)[levels(df$Subcategory)=="all (cross)"] <- "_ALL-CROSS_"
levels(df$Subcategory)[levels(df$Subcategory)=="aa_all (pure)"] <- "_ALL-PURE_"

levels(df$Subcategory)[levels(df$Subcategory)=="all pure and cross breeds"] <- "_ALL-DOGS_"
	# redundant with Category "DOG"
levels(df$Subcategory)[levels(df$Subcategory)=="classified"] <- "_"
	# Seems to be for internal use only.
	# Used to group [1008_probationary,1009_disqualified].
levels(df$Subcategory)[levels(df$Subcategory)=="total"] <- "_"
	# Seems to be for internal use only.
	# Used to group [1010_currently registered dog owners,1011_infringements].
levels(df$Subcategory)[levels(df$Subcategory)=="under the Dog Control Act 1996"] <- "_"
	# Completely redudant with `E Ministry of Justice Statistics`.
	# Seems to be for internal use only.
	# Used to group [1012_total prosecutions,1013_total dog destruction orders].
levels(df$Subcategory)[levels(df$Subcategory)=="Dog-related injury"] <- "_"
	# Completely redudant with `F Accident Compensation Corporation Statistics`.
	# Seems to be for internal use only.
	# Used to group [1014_number of new claims,1015_total paid (excl GST) for injuries in any yr,1016_total paid (excl. GST) for injuries this yr]

names(df)[names(df)=="Subcategory"] <- "Breed"

# about dogs. No need for prefix, they all have a category tag (either of DOG, DGP, DGX)
levels(df$Item)[levels(df$Item)=="1001_total"] <- "total"
levels(df$Item)[levels(df$Item)=="1002_female"] <- "female"
levels(df$Item)[levels(df$Item)=="1003_male"] <- "male"
levels(df$Item)[levels(df$Item)=="1004_de-sexed"] <- "desexed"
levels(df$Item)[levels(df$Item)=="1005_micro-chipped"] <- "chipped"
levels(df$Item)[levels(df$Item)=="1006_classified as menacing"] <- "menacing"
levels(df$Item)[levels(df$Item)=="1007_classified as dangerous"] <- "dangerous"
# about owners. No need for prefix, they all have a category tag (OWN)
levels(df$Item)[levels(df$Item)=="1008_probationary"] <- "probationary"
levels(df$Item)[levels(df$Item)=="1009_disqualified"] <- "disqualified"
levels(df$Item)[levels(df$Item)=="1010_currently registered dog owners"] <- "registered"
levels(df$Item)[levels(df$Item)=="1011_infringements"] <- "infringements"
# about justice court. No need for prefix, they all have a category tag (JST)
levels(df$Item)[levels(df$Item)=="1012_total prosecutions"] <- "prosecutions"
levels(df$Item)[levels(df$Item)=="1013_total dog destruction orders"] <- "destruction"
# about ACC claims. No need for prefix, they all have a category tag (ACC)
levels(df$Item)[levels(df$Item)=="1014_number of new claims"] <- "injuries"
levels(df$Item)[levels(df$Item)=="1015_total paid (excl GST) for injuries in any yr"] <- "paid_any_yr"
levels(df$Item)[levels(df$Item)=="1016_total paid (excl. GST) for injuries this yr"] <- "paid_this_yr"

write.table(df, file='saved/renamed.tsv', quote=FALSE, sep='\t', row.names = F)

# With the default long format, council names are repeated for each line
# Given that all lines do have a valid council name,
# grouping data by council could considerably reduce the file size (from 4MB to 1MB)
shrink <- dcast(Council+Year+Category+Breed~Item,data = df,value.var = "Value",fun.aggregate = sum,fill=0)
write.table(shrink, file='saved/shrunk.tsv', quote=FALSE, sep='\t', row.names = F)
