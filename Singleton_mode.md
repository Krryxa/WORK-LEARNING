# 单例模式

面试会经常遇到单例和工厂设计模式，本文讲解单例设计模式

## 定义
一个类中能创建一个实例，称之为单例

适用场景

频繁创建对象、管理对象是一件耗费资源的事，可以使用单例模式

Java web 中
单例：Servlet、SpringMVC
多例：Struts2

## 代码编写
编写单例模式的代码其实很简单，就分了三步：

1. 将构造函数私有化（禁止 new 对象）
2. 在类的内部创建实例
3. 提供获取唯一实例的方法

### 饿汉式
根据上面的步骤，我们就可以轻松完成创建单例对象了
```java
public class Krryblog {

  // 1.将构造函数私有化，不可以通过 new 的方式来创建对象
  private Krryblog() {}

  // 2.在类的内部创建自行实例
  private static final Krryblog krryblog = new Krryblog();

  // 3.提供获取唯一实例的方法
  public static Krryblog getKrryblog() {
      return krryblog;
  }
}
```
以上这种代码我们称之为：“饿汉式”：

一上来就创建对象了，如果该实例从始至终都没被使用过，则会造成内存浪费

### 简单懒汉式（在方法加锁）
上面饿汉式一上来就自动创建对象，如果没有用过会造成内存浪费

那简单懒汉式就是用到的时候再创建对象
```java
public class Krryblog {

  // 1. 将构造函数私有化，不可以通过new的方式来创建对象
  private Krryblog(){}

  // 2. 先不创建对象，等用到的时候再创建
  private static Krryblog krryblog = null;

  // 3. 调用到这个方法了，证明是要被用到的了
  public static synchronized Krryblog getKrryblog() {

      // 4. 如果这个对象引用为null，我们就创建并返回出去，不为 null，就不再创建
      if (krryblog == null) {
          krryblog = new Krryblog();
      }

      return krryblog;
  }
}
```
- 注意，上面调用 getKrryblog 如果不加锁 synchronized，在多线程环境下无效，所以多线程下一定要加锁 synchronized

### 双重检测机制(DCL)懒汉式（进阶懒汉式）
上面那种直接在方法上加锁的方式其实不够好，因为在方法上加了内置锁在多线程环境下性能会比较低下，所以我们可以将锁的范围缩小
```java
public class Krryblog {
  private Krryblog() {}

  // 可能会有重排序问题，加上 volatile 关键字解决
  // volatile 有内存屏障的功能
  private static volatile Krryblog krryblog = null;

  public static Krryblog getKrryblog() {
    // 这里判断是否为空，主要是为了提高性能
    if (krryblog == null) {

      // 锁住这里就行了，里面还有一个判断是否为空
      // 将锁的范围缩小，提高性能
      synchronized (Krryblog.class) {

        // 再判断一次是否为null
        // 如果只在外面加 null 判断，若两个线程同时调用 getKrryblog，同时判断外面的 null，那也会创建出两个对象
        // 所以在锁的里面也要加上 null 判断
        if (krryblog == null) {
          krryblog = new Krryblog();
        }
      }
    }
    return krryblog;
  }
}
```
需要在锁里面再判断一次是否为null

如果只在外面加 null 判断，若两个线程同时调用 getKrryblog，同时判断外面的 null，那进入里面也会创建出两个对象
所以在锁的里面也要加上 null 判断

里面加上 null 判断后，外面的 null 判断就变成提高性能的作用了

### 静态内部类懒汉式（推荐写法）
还可以使用静态内部类这种巧妙的方式来实现单例模式

原理：
当任何一个线程第一次调用 getInstance()时，都会使 SingletonHolder 被加载和被初始化，此时静态初始化器将执行Singleton的初始化操作。(被调用时才进行初始化)

初始化静态数据时，Java 提供了的线程安全性保证(所以不需要任何的同步)
```java
public class Krryblog {

  private Krryblog() {}

  // 使用内部类的方式来实现懒加载
  private static class LazyHolder {
    // 创建单例对象
    private static final Krryblog INSTANCE = new Krryblog();
  }

  // 获取对象
  public static final Krryblog getInstance() {
    return LazyHolder.INSTANCE;
  }
  
}
```
静态内部类这种方式是非常推荐使用的，这种写法很优化也高效

### 枚举方式（最安全、简洁写法，推荐写法）
```java
public enum Krryblog {

  INSTANCE,

  private Resource resource;
  
  // 创建单例对象
  public Krryblog () {
    resource = new Resource();
  }

  // 获取单例对象
  public Resource getInstance() {
    return resource;
  }
}
```
测试
```java
public class TestPattern {
 
  public static void main(String[] args) {
      Resource instance = Krryblog.INSTANCE.getInstance();
  }
}
```
枚举的方式实现：
如上代码，外部只能通过 Krryblog 的 getInstance 来获得 resource 对象，再没有其他途径
因为枚举变量是 static final 的，所以如果不是定义时声明，那只能在构造方法中实例化，并且有且只能实例化一次

所以保证了 resource 对象的单例性

当我们使用 enum 关键字定义一个枚举的时候，他会帮我们在编译后默认继承 java.lang.Enum 类，而不像其他的类一样默认继承 Object 类。且采用 enum 声明后，该类会被编译器加上 final 声明，故该类是无法继承的

由于JVM类初始化是线程安全的，所以可以采用枚举类实现一个线程安全的单例模式

1. 简单写法
2. 防止多次实例化，即使是在面对复杂的序列化或者反射攻击的时候（安全）

这种也较为推荐使用

## 总结
总的来说单例模式写法有5种：

1. 饿汉式
2. 简单懒汉式（在方法加锁）
3. DCL双重检测加锁（进阶懒汉式）
4. 静态内部类实现懒汉式（推荐写法）
5. 枚举方式（最安全、简洁写法，推荐写法）