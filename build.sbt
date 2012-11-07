name := "d3_koodikerho"

version := "1.0.0"

organization := "fi.iki.jthx"

scalaVersion := "2.9.2"

// you can also add multiple repositories at the same time
resolvers ++= Seq(
  "Web plugin repo" at "http://siasia.github.com/maven2",
  "Scala Tools Releases" at "http://scala-tools.org/repo-releases/",
  "Java.net Maven2 Repository" at "http://download.java.net/maven/2/"
)

seq(webSettings :_*)

libraryDependencies ++= {
  Seq(
    "org.eclipse.jetty" % "jetty-plus" % "7.5.1.v20110908" % "container"
  )
}