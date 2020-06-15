#%%
#import Libraries 
import pandas as pd 
import numpy as np 
#%% 
#Population of G-20 Nations
#Data Source: https://data.worldbank.org/indicator/SP.POP.TOTL?locations=1W
Population = pd.read_excel("Total_Population.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
Population_20 = Population.reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017","2018"])

Population_Millions = Population_20/1000000
Population_Millions


#Population20=Population_20.[:,("Country Name","2012","2013","2014","2015","2016","2017","2018","2019")
#%%
cols1 = list(Population_20.columns)
print(cols1)
print(Population_20.head())

#%%
#get gdp 
GDPcurrUSD = pd.read_excel("GDP_Curr_$.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
GDPcurrUSD_20  = GDPcurrUSD.reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017"])

#put into millions 

GDPcurrUSD_20_Millions = GDPcurrUSD_20/1000000
GDPcurrUSD_20_Millions


# %%
cols2 = list(GDPcurrUSD_20.columns)
print(cols2)
print(GDPcurrUSD_20.head(20))

#%%
#Per Capita GDP 
#https://data.worldbank.org/indicator/NY.GDP.PCAP.CD
GDPcurrUSDPC = pd.read_excel("GDP_curr_pc.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
GDPcurrUSDPC_20  = GDPcurrUSDPC.reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017"])





#%%
GDPcurrUSDPC_20


#%%
#Per capita healthcare 
#https://data.worldbank.org/indicator/SH.XPD.CHEX.PC.CD
HealthPC = pd.read_excel("Health_PC.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
HealthPC_20  = HealthPC.reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017"])


# %%
cols4 = list(HealthPC_20.columns)
print(cols4)
HealthPC_20.head(20)

#%%
#total health care expenditure for G20 countries 
HealthExpense = Population_20 * HealthPC_20  #health expenses in US $
HealthExpense_Millions = HealthExpense/1000000 #health expenses in millions
HealthExpense_Millions
#%%
# Healthcare % of GDP 
#https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS

HealthpercGDP = pd.read_excel("Health_GDP.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
HealthGDP_20  = HealthpercGDP .reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017"])

#%%

HealthGDP_20

#%%
# education % of GDP 
#https://data.worldbank.org/indicator/SE.XPD.TOTL.GD.ZS
educpercGDP = pd.read_excel("educ_GDP.xls", sheet_name= "Data", skiprows = 3, index_col = 0)
educGDP_20  = educpercGDP .reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["Country Code","2013","2014","2015","2016","2017"])



#%%
cols6 = list(educGDP_20.columns)
print(cols6)
educGDP_20









# %%
#total education spending had to use non world bank source... data is sparse 
educ_total = pd.read_excel("educ_total.xls", sheet_name= "Sheet1", skiprows = 0, index_col = 0)


# %%
#per capita education spending 
educ_percapita=educ_total/Population_Millions

educ_percapita

# %%
#per student education numbers 
educperstudent = pd.read_excel("educ_perstudent.xls", sheet_name= "UIS.Stat export", skiprows = 3, index_col = 0)
educperstudent  = educperstudent .reindex(['Argentina','Australia', 'Brazil', 'Canada', 'China', 'France',
                              'Germany', 'India', 'Indonesia', 'Italy', 'Japan', 'Korea, Rep.','Mexico',
                              'Russian Federation','Saudi Arabia', 'South Africa', 'Turkey','United Kingdom','United States'], 
                                   ["2013","2014","2015","2016","2017"])

# %%
educperstudent

# %%
