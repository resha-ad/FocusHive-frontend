from tkinter import *
from tkinter import messagebox
import sqlite3

window=Tk()
window.title("Add Income Page")
window.config(bg='#bcecac')
window.maxsize(width=760,height=490)
window.minsize(width=760,height=490)

def get_id():
    conn = sqlite3.connect("UserDB.db")
    c = conn.cursor()

    # Execute a SELECT query to retrieve the primary key ID
    c.execute("SELECT id FROM users_info")
    record_id = c.fetchone()
    print(record_id)
    conn.close()

get_id()

# def incomeadd(record_id):
#     inc_title = income_title.get()
#     inc_amount = income_amount.get()
#     inc_type = income_type.get()

#     conn = sqlite3.connect("UserDB.db")
#     c = conn.cursor()
#     c.execute('''
#          UPDATE users_info SET 
#          incometitle = :inc_title, 
#          incomeamount = :inc_amount,
#          incometype = :inc_type
#          WHERE id = : user_id''',
#          {'inc_title': inc_title,
#           'inc_amount': inc_amount,
#           'inc_type' : inc_type,
#           'id': record_id 
#             }
#     )  
#     conn.commit()
#     conn.close()

    


# def submit_inc():
#     inc_title=income_title.get()
#     inc_amount=int(income_amount.get())
#     inc_type=income_type.get()
    
#     if inc_title =="":
#         messagebox.showerror("Error","Income title not provided")
#     elif (inc_amount==0 or inc_amount<0):
#             messagebox.showerror("Error","Invalid amount")
#     elif inc_type=="":
#         messagebox.showerror("Error","Income type not provided")
#     else:
#         try:
#             incomeadd(inc_title,inc_amount,inc_type)
#         except ValueError:
#             messagebox.showerror("Invalid Value in Income Amount")
        
    

#creating frame
frame1=Frame(window,width=200,height=440)
frame1.config(bg="white") 
frame1.place(x=20,y=20)

#adding labels in frame 1
add_income=Button(frame1,text="Add Income",borderwidth=0,bg='dark green',fg='white')
add_expenses=Button(frame1,text="Add Expenses",borderwidth=0,bg="white")
view_report=Button(frame1, text="View Report", borderwidth=0,bg='white')

#placing labels in frame 1
add_income.place(x=20,y=160)
add_expenses.place(x=20,y=190)
view_report.place(x=20,y=220)

#creating frame 2
frame2=Frame(window,width=480,height=440)
frame2.config(bg="white") 
frame2.place(x=250,y=20)

#creating labels
total_label=Label(frame2,text="Total Income:",bg='light green',font=("Hubballi",20),width=25)
income_title=Entry(frame2,bg='light green',font=('Hubbali',12))
income_title.insert(0, "Income Title")
income_amount=Entry(frame2,bg='light green',font=('Hubbali',12))
income_amount.insert(0, "Income Amount")
income_type=Entry(frame2, bg='light green',font=('Hubbali',12))
income_type.insert(0, "Income Type")
add_income=Button(frame2, text="Add Income",font=('Hubbali',12))

#place labels
total_label.place(x=40,y=40)
income_title.place(x=40,y=90)
income_amount.place(x=40,y=120)
income_type.place(x=40,y=150)
add_income.place(x=40,y=180)


window.mainloop()