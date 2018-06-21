using AngularCRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace AngularCRUD.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee  
        public ActionResult Index()
        {
            return View();
        }
        /// <summary>  
        ///   
        /// Get All Employee  
        /// </summary>  
        /// <returns></returns>  
        public JsonResult Get_AllEmployee()
        {
            using (testEntities Obj = new testEntities())
            {
                List<employee> Emp = Obj.employees.ToList();
                return Json(Emp, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>  
        /// Get Employee With Id  
        /// </summary>  
        /// <param name="Id"></param>  
        /// <returns></returns>  
        public JsonResult Get_EmployeeById(string Id)
        {
            using (testEntities Obj = new testEntities())
            {
                int EmpId = int.Parse(Id);
                return Json(Obj.employees.Find(EmpId), JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>  
        /// Insert New Employee  
        /// </summary>  
        /// <param name="Employe"></param>  
        /// <returns></returns>  
        public string Insert_Employee(employee Employe)
        {
            if (Employe != null)
            {
                using (testEntities Obj = new testEntities())
                {
                    Obj.employees.Add(Employe);
                    Obj.SaveChanges();
                    return "Employee Added Successfully";
                }
            }
            else
            {
                return "Employee Not Inserted! Try Again";
            }
        }
        /// <summary>  
        /// Delete Employee Information  
        /// </summary>  
        /// <param name="Emp"></param>  
        /// <returns></returns>  
        public string Delete_Employee(employee Emp)
        {
            if (Emp != null)
            {
                using (testEntities Obj = new testEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    if (Emp_.State == System.Data.Entity.EntityState.Detached)
                    {
                        Obj.employees.Attach(Emp);
                        Obj.employees.Remove(Emp);
                    }
                    Obj.SaveChanges();
                    return "Employee Deleted Successfully";
                }
            }
            else
            {
                return "Employee Not Deleted! Try Again";
            }
        }
        /// <summary>  
        /// Update Employee Information  
        /// </summary>  
        /// <param name="Emp"></param>  
        /// <returns></returns>  
        public string Update_Employee(employee Emp)
        {
            if (Emp != null)
            {
                using (testEntities Obj = new testEntities())
                {
                    var Emp_ = Obj.Entry(Emp);
                    employee EmpObj = Obj.employees.Where(x => x.id == Emp.id).FirstOrDefault();
                    EmpObj.age = Emp.age;
                    EmpObj.city = Emp.city;
                    EmpObj.name = Emp.name;
                    Obj.SaveChanges();
                    return "Employee Updated Successfully";
                }
            }
            else
            {
                return "Employee Not Updated! Try Again";
            }
        }
    }
}