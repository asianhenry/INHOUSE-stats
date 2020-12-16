from flask import Flask, request, g, redirect, render_template, jsonify, session, flash
import pandas as pd
import numpy as np
import statistics




app = Flask(__name__)


@app.route("/")
def login():

    return render_template('index.html')

@app.route("/error")
def relogin():

    return render_template('error.html')


@app.route("/player_data", methods=['GET', 'POST'])
def player_data():
    # Auth Step 1: Authorization

    player_input = request.form['username']
    player_data = pd.read_csv('data/inhouse.csv')
    player_search = player_data[player_data['player'].str.lower()==player_input.lower()]
    
    
    if len(player_search) > 0:
        unique_players = list(player_data['player'].dropna().unique())
    

        player_search = player_data[player_data['player'].str.lower()==player_input.lower()]
        player_search = player_search.reset_index(drop=True)
        wins = list(player_search['w/l']).count('w')
        losses = list(player_search['w/l']).count('l')
        win_pct = round(wins/(wins+losses)*100,2)
        champs = list(player_search['champ'])
        roles = list(player_search['role'])
        total_kda = round((sum(player_search['k'])+sum(player_search['a']))/sum(player_search['d']),2)
        first_bloods = list(player_search['first_blood']).count('y')
        no_supp = player_search[player_search['role']!='supp']
        avg_cs = round(statistics.mean(no_supp['cs/min']),2)
        avg_dmg = round(statistics.mean(no_supp['dmg_share']),2)


        player_dict = {}
        player_dict['id'] = player_search['player'][0]
        player_dict['games_played'] = len(player_search)
        player_dict['wins'] = wins
        player_dict['losses'] = losses
        player_dict['win_pct'] = win_pct
        player_dict['kda'] = total_kda
        player_dict['avg_cs'] = avg_cs
        player_dict['avg_dmg'] = avg_dmg
        player_dict['first_bloods'] = first_bloods
        player_dict['champs'] = champs
        player_dict['roles'] = roles

        return render_template('player_stats.html',player_dict = player_dict)
        
    else:
        return redirect('/error')
    


    



if __name__ == "__main__":
    app.run(debug=True)

    