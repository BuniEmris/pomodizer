//
//  PomodizerWidget.swift
//  PomodizerWidget
//
//  Created by Oleg Dmytruk on 16.11.2022.
//

import WidgetKit
import SwiftUI
import Intents

struct Shared:Decodable {
  let tasks: [Task]
  let allTasks: String
  let completedTasks: String
}

var mockTasks = [
  Task(id: "1", title: "Install pomodizer", time: "12:00"),
  Task(id: "2", title: "Set your first goal", time: "14:00"),
  Task(id: "3", title: "Start timer")
]


struct Provider: IntentTimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
      SimpleEntry(date: Date(), tasks: mockTasks, allTasks: "4", completedTasks: "2")
    }

    func getSnapshot(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (SimpleEntry) -> ()) {
      let entry =  SimpleEntry(date: Date(), tasks: mockTasks, allTasks: "4", completedTasks: "2")
        completion(entry)
    }

    func getTimeline(for configuration: ConfigurationIntent, in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
        var tasks: [Task] = []
        var allTasks = ""
        var completedTasks = ""
        let sharedDefaults = UserDefaults.init(suiteName: "group.com.oidmtruk.pomodizer")
          if sharedDefaults != nil {
                do{
                  let shared = sharedDefaults?.string(forKey: "tasksData")
                  if(shared != nil){
                  let data = try JSONDecoder().decode(Shared.self, from: shared!.data(using: .utf8)!)
                    tasks = data.tasks
                    allTasks = data.allTasks
                    completedTasks = data.completedTasks
                  }
                }catch{
                  print(error)
                }
          }

        // Generate a timeline consisting of five entries an hour apart, starting from the current date.
        let currentDate = Date()
//        for hourOffset in 0 ..< 5 {
        let entry = SimpleEntry(date: currentDate, tasks: tasks, allTasks: allTasks, completedTasks: completedTasks )
        entries.append(entry)
//        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct Task: Decodable {
  let id: String
  var title: String
  var time: String!
}

struct SimpleEntry: TimelineEntry {
    var date: Date
    var tasks: [Task]
    var allTasks: String
    var completedTasks: String
}

struct PomodizerWidgetEntryView : View {
    @Environment(\.widgetFamily) var widgetFamily
    var entry: Provider.Entry
  
  var body: some View {
    var allToCompletedTasks = "- \(entry.completedTasks)/\(entry.allTasks)"
    
    switch widgetFamily {
    case .accessoryCircular:
      VStack {
        Gauge(value: 0.75) {
          Text(allToCompletedTasks)
        }
        .gaugeStyle(.accessoryCircularCapacity)
      }
    case .accessoryInline:
      Text("Today tasks \(allToCompletedTasks)")
    case .systemMedium, .systemSmall, .accessoryRectangular:
      ZStack (alignment: .topLeading) {
        ContainerRelativeShape()
          .fill(.green.gradient.opacity(0.02))
        VStack(alignment: .leading) {
          HStack {
            Image("logo").resizable().frame(width: 30, height: 30)
            Text("Today tasks \(allToCompletedTasks)").font(.headline)
          }
          ForEach(entry.tasks.prefix(3), id: \.self.id) {task in
            HStack() {
              if let taskTime = task.time {
                Text(taskTime).font(.headline)
              }
              Text(task.title)
              Spacer()
            }.padding(.bottom, 2).frame(maxWidth: .infinity).overlay(Divider(), alignment: .bottom)
          }
          if entry.tasks.count == 0 {
            Spacer()
            Text(entry.allTasks == "0" ? "No tasks for today" : "All tasks completed").foregroundColor(.gray)
            Spacer()
          }
        }.padding(.horizontal)
        .privacySensitive()
      }.padding(.vertical, 10)
    default:
      ZStack (alignment: .topLeading) {
        ContainerRelativeShape()
          .fill(.green.gradient.opacity(0.02))
        VStack(alignment: .leading) {
          HStack {
            Image("logo").resizable().frame(width: 30, height: 30)
            Text("Today tasks \(allToCompletedTasks)").font(.headline)
          }
          ForEach(entry.tasks, id: \.self.id) {task in
            HStack() {
              if let taskTime = task.time {
                Text(taskTime).font(.headline)
              }
              Text(task.title)
              Spacer()
            }.padding(.bottom, 2).frame(maxWidth: .infinity).overlay(Divider(), alignment: .bottom)
          }
          if entry.tasks.count == 0 {
            Spacer()
            Text(entry.allTasks == "0" ? "No tasks for today" : "All tasks completed").foregroundColor(.gray)
            Spacer()
          }
        }.padding(.horizontal)
        .privacySensitive()
      }.padding(.vertical, 10)
      }
      }
}

@main
struct PomodizerWidget: Widget {
    let kind: String = "PomodizerWidget"

    var body: some WidgetConfiguration {
        IntentConfiguration(kind: kind, intent: ConfigurationIntent.self, provider: Provider()) { entry in
            PomodizerWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("PomodizerWidget")
        .description("This is an widget to display pomodizer tasks.")
    }
}




struct PomodizerWidget_Previews: PreviewProvider {

    static var previews: some View {
      PomodizerWidgetEntryView(entry: SimpleEntry(date: Date(), tasks: mockTasks, allTasks: "10", completedTasks: "5"))
        .previewContext(WidgetPreviewContext(family: .systemMedium))
    }
}
