from pymysql import Connect


def getData(sql):
    conn = Connect(host="localhost",
                   port=3306,
                   user="root",
                   password="zwh971030",
                   database="visual_db_2017",
                   charset="utf8")
    cur = conn.cursor()
    cur.execute(sql)
    data = cur.fetchall()
    conn.close()
    return data

