#Author:Juan Carlos Velazquez Quiroz
#Date:Mon Apr 24 05:34:38 AM MST 2023
#Simple bash file in which the script adds to all empty folders .gitkeep, this task is done due to the need to have a pseudo structure
#focused on a hexagonal architecture.
!/bin/bash
find . -type d -empty -not -path "./.git/*" -exec touch {}/.gitkeep \;

