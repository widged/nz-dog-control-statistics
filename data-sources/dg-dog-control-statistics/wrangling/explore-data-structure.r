#!/usr/bin/env Rscript

df <- read.csv("../downloaded/dogcontrolstatistics.csv", header = TRUE)


names(df)
print("#########################")
print(head(df))
print("#########################")
table(df$Council.name)
print("-------------------------")
table(df$Dog.control.statistics.category)
print("-------------------------")
table(df$Subcategory)
print("-------------------------")
table(df$Item)
print("-------------------------")
table(df$Year)
print("#########################")


# levels(dogs$Council.name)
